from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from helper import get_gemini_response, get_recommendations_corr, generate_suggestions  # Ensure generate_suggestions is imported

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

if __name__ == '__main__':
    app.run(debug=True)
