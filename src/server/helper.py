import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
from sklearn.feature_extraction.text import CountVectorizer
import plotly.express as px
from pytrends.request import TrendReq
from statsmodels.tsa.seasonal import seasonal_decompose
import matplotlib.pyplot as plt
from langchain_community.llms import HuggingFaceHub
import google.generativeai as genai

genai.configure(api_key='AIzaSyBRTQgiA55-DsG3ssjitrMf_4-f9Q9xW1A')

def get_gemini_response(input_text):
    model = genai.GenerativeModel("gemini-1.5-flash",
                                  generation_config={"response_mime_type": "application/json"})
    response = model.generate_content(input_text)
    return response.text


df = pd.read_csv('myntra_product_data.csv')
df = df.dropna(subset=['product_description'])
df['Text'] = 'Brand:' + df['brand'] + '\n' + 'Product Name:' + df['product'] + '\n' + 'Description:' + df['product_description']

nltk.download('punkt')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [word for word in tokens if word.isalnum() and word not in stop_words and word not in string.punctuation]
    return tokens

df['preprocessed_description'] = df['Text'].apply(lambda x: preprocess(x) if pd.notnull(x) else [])
df['description_string'] = df['preprocessed_description'].apply(lambda x: ' '.join(x))

vectorizer = CountVectorizer()
count_matrix = vectorizer.fit_transform(df['description_string'].fillna(''))

count_df = pd.DataFrame(count_matrix.toarray(), columns=vectorizer.get_feature_names_out(), index=df.index)

def get_recommendations_corr(user_input, top_n=5):
    user_input_processed = preprocess(user_input)
    if user_input_processed:
        user_input_string = ' '.join(user_input_processed)
        user_count = vectorizer.transform([user_input_string])
        user_count_df = pd.DataFrame(user_count.toarray(), columns=vectorizer.get_feature_names_out())
        
        correlations = count_df.corrwith(user_count_df.iloc[0], axis=1)
        
        top_correlations = correlations.nlargest(top_n)
        recommendations = df.loc[top_correlations.index][['Text', 'link']]
        return recommendations
    else:
        return pd.DataFrame()


def generate_suggestions(descriptions):
    output = []
    for desc in descriptions:
        template = f"""
        You're job is to output 3 short keywords/keyphrases which may seem like the best ones to check google search volume of for fashion trend identification, using the Description provided.
        For example:
        Description: `Brand:FREAKINS
        Product Name:Women Wide Leg Cotton Jeans
        Description:Medium shade, light fade blue jeans | Wide leg, high-rise | Mildly distressed | Ripped | Non stretchable | 5 pocket | Length: regular`

        Your Response: ['Wide Leg Jeans','Mildly Distressed Jeans','High Rise Jeans']

        Use the below description and answer only on the basis of this. Don't use any prior knowledge!
        Description: {desc}
        Your Response:"""
        response = get_gemini_response(template)
        output.append(response)
    return output

# llm = HuggingFaceHub(
#     repo_id="mistralai/Mistral-7B-Instruct-v0.3",
#     model_kwargs={"temperature": 0.2, "max_new_tokens": 2000, "return_full_text": False},
#     huggingfacehub_api_token=secret_key
# )



def fetch_trend_data(kw_list, timeframes):
    pytrends = TrendReq(hl='en-US', tz=360)
    for timeframe in timeframes:
        try:
            pytrends.build_payload(kw_list, timeframe=timeframe)
            data = pytrends.interest_over_time()
            if not data.empty:
                return data
        except Exception as e:
            print(f"Failed to retrieve data for timeframe: {timeframe} - Error: {e}")
    return None

def plot_trends(data, keywords):
    data = data.reset_index()
    fig = px.line(data, x="date", y=keywords, title='Keyword Web Search Interest Over Time')
    fig.show()

def decompose_data(df, share_type='count', samples=250, period=24):
    if samples == 'all':
        res = seasonal_decompose(df[share_type].values, period=period)
    else:
        res = seasonal_decompose(df[share_type].values[-samples:], period=period)
    
    observed = res.observed
    trend = res.trend
    seasonal = res.seasonal
    residual = res.resid
    
    fig, axs = plt.subplots(4, figsize=(16,8))
    axs[0].set_title('OBSERVED', fontsize=16)
    axs[0].plot(observed)
    axs[0].grid()
    
    axs[1].set_title('TREND', fontsize=16)
    axs[1].plot(trend)
    axs[1].grid()
    
    axs[2].set_title('SEASONALITY', fontsize=16)
    axs[2].plot(seasonal)
    axs[2].grid()
    
    axs[3].set_title('NOISE', fontsize=16)
    axs[3].plot(residual)
    axs[3].scatter(y=residual, x=range(len(residual)), alpha=0.5)
    axs[3].grid()
    
    plt.show()

