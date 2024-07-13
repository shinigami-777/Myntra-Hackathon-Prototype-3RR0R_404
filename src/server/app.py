from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import torch
import torch.nn as nn
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import time
from helper import get_gemini_response, get_recommendations_corr,generate_suggestions,get_gemini_response_no_json
import json
import base64

app = Flask(__name__)
CORS(app)

@app.route('/api/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    prompt = f"""
    Using the following JSON schema,
    Please list {data['numQuestions']} quiz questions in {data['language']} on {data['fashionTheme']} and difficulty level of the quiz should be {data['level']}.
    Recipe = {{
        "question": "str",
        "options": "list",
        "answer": "str"
    }} 
    Return: list[Recipe]
    
    example:
    [
        {{
            "question": "What is the largest ocean in the world?",
            "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            "answer": "Pacific Ocean"
        }},
        {{
            "question": "Who is the author of the Harry Potter series?",
            "options": ["J.K. Rowling", "Roald Dahl", "Dr. Seuss", "Rick Riordan"],
            "answer": "J.K. Rowling"
        }},
        {{
            "question": "Which programming language is better for Data Science?",
            "options": ["Java", "R", "SQL", "Python"],
            "answer": "Python"
        }},
        {{
            "question": "What is the value of Pi?",
            "options": ["22/7", "4.6", "No One", "1 and 2 both"],
            "answer": "22/7"
        }}
    ]
    """
    
    raw_response = get_gemini_response(prompt)
    
    try:
        quiz_data = json.loads(raw_response)
        return jsonify(quiz_data)
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON from response"}), 400

@app.route('/api/fashion_trends', methods=['POST'])
def fashion_trends():
    data = request.json
    keyword = data.get('keyword', '')
    generate_suggestions_flag = data.get('generate_suggestions', False)
    
    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400
    
    recommendations = get_recommendations_corr(keyword)
    if recommendations.empty:
        return jsonify({"error": "No recommendations found"}), 404
    
    response = {
        "recommendations": recommendations.to_dict(orient='records')
    }
    
    if generate_suggestions_flag:
        descriptions = recommendations['Text'].tolist()
        suggestions = generate_suggestions(descriptions)
        response["suggestions"] = suggestions
    
    return jsonify(response)



@app.route('/api/trend_analysis', methods=['POST'])
def trend_analysis():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    df = pd.read_csv(file, index_col=0, parse_dates=True)
    
    value = df.iloc[0, 0]
    
    df.rename(columns={'Category: All categories': 'data'}, inplace=True)
    df = df.iloc[1:].reset_index(drop=True)

    start_date = '2019-07-07'
    date_range = pd.date_range(start=start_date, periods=len(df), freq='7D')
    df['date'] = [date.date() for date in date_range]

    num_new_rows = 20
    date_freq = pd.DateOffset(weeks=1)
    start_index = len(df)

    for i in range(num_new_rows):
        new_date = (df['date'].iloc[-1] + date_freq).date()
        new_row = {'data': 0, 'date': new_date}
        df.loc[start_index + i] = new_row

    df['data'] = pd.to_numeric(df['data'])

    y = df['data'].values.astype(float)
    test_size = 20
    train_set = y[:-test_size]

    scaler = MinMaxScaler(feature_range=(-1, 1))
    train_norm = scaler.fit_transform(train_set.reshape(-1, 1))
    train_norm = torch.FloatTensor(train_norm).view(-1)

    window_size = 20

    def input_data(seq, ws):
        out = []
        L = len(seq)
        for i in range(L - ws):
            window = seq[i:i + ws]
            label = seq[i + ws:i + ws + 1]
            out.append((window, label))
        return out

    train_data = input_data(train_norm, window_size)

    class Trends(nn.Module):
        def __init__(self, input_size=1, hidden_size=100, output_size=1):
            super().__init__()
            self.hidden_size = hidden_size
            self.lstm = nn.LSTM(input_size, hidden_size)
            self.linear = nn.Linear(hidden_size, output_size)
            self.hidden = (torch.zeros(1, 1, self.hidden_size),
                           torch.zeros(1, 1, self.hidden_size))

        def forward(self, seq):
            out, self.hidden = self.lstm(seq.view(len(seq), 1, -1), self.hidden)
            pred = self.linear(out.view(len(seq), -1))
            return pred[-1]

    predictorModel = Trends()
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(predictorModel.parameters(), lr=0.001)

    epochs = 15

    for epoch in range(epochs):
        for seq, y_train in train_data:
            optimizer.zero_grad()
            predictorModel.hidden = (torch.zeros(1, 1, predictorModel.hidden_size),
                                     torch.zeros(1, 1, predictorModel.hidden_size))
            y_pred = predictorModel(seq)
            loss = criterion(y_pred, y_train)
            loss.backward()
            optimizer.step()

    future = 20
    preds = train_norm[-window_size:].tolist()
    predictorModel.eval()

    for i in range(future):
        seq = torch.FloatTensor(preds[-window_size:])
        with torch.no_grad():
            predictorModel.hidden = (torch.zeros(1, 1, predictorModel.hidden_size),
                                     torch.zeros(1, 1, predictorModel.hidden_size))
            preds.append(predictorModel(seq).item())

    true_prediction = scaler.inverse_transform(np.array(preds[window_size:]).reshape(1, -1)).squeeze()
    
    start_date_train = '2019-07-07'
    start_date_pred = '2024-07-14'
    date_range_train = pd.date_range(start=start_date_train, periods=len(train_set), freq='7D')
    date_range_pred = pd.date_range(start=start_date_pred, periods=len(true_prediction), freq='7D')

    plt.figure(figsize=(12, 4))
    plt.plot(date_range_train, train_set, color='black', label='Interest Over Time')
    plt.plot(date_range_pred, true_prediction, color='green', label='Predicted Interest Over Time')
    plt.title('Interest Over Time')
    plt.xlabel('Date')
    plt.ylabel('Interest')
    plt.legend()
    plt.grid(True)

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    img_str = base64.b64encode(img.getvalue()).decode('utf-8')

    prompt = f"""
        As a fashion trends analyst, you've been provided with time series forecasting data for the fashion trend of {value}:
        {true_prediction}
        Based on this sequence, provide brief and coherent recommendations to the user:
        - If the trend appears promising and worth investing in, suggest reasons and potential benefits.
        - If the trend indicates a downturn or suggests caution, recommend alternative options or considerations.
        - If the trend shows no significant change, advise the user accordingly on its stability.
        Respond in a HTML formatted manner so that it can be integrated into a javascript webpage!
        Your Response:"""

    try:
        response = get_gemini_response_no_json(prompt)
        print("LLM Analysis Response:", response)
    except Exception as e:
        print("Error in LLM Analysis:", str(e))
        response = str(e)

    return jsonify({
        "response": response,
        "image": img_str
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
