import pandas as pd

df = pd.read_csv('myntra_product_data.csv')

df['Text'] = 'Brand:' + df['brand'] + '\n' + 'Product Name:' + df['product']
df.loc[~df['product_description'].isna(), 'Text'] += '\n' + 'Description:' + df['product_description']

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

nltk.download('punkt')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))
def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [word for word in tokens if word.isalnum() and word not in stop_words and word not in string.punctuation]
    return tokens

df['preprocessed_description'] = df['Text'].apply(lambda x: preprocess(x) if pd.notnull(x) else [])


from sklearn.feature_extraction.text import CountVectorizer

# Join the tokens back into a string for vectorization
df['description_string'] = df['preprocessed_description'].apply(lambda x: ' '.join(x))

# Create a CountVectorizer
vectorizer = CountVectorizer()
count_matrix = vectorizer.fit_transform(df['description_string'].fillna(''))

# Convert to DataFrame
count_df = pd.DataFrame(count_matrix.toarray(), columns=vectorizer.get_feature_names_out(), index=df.index)


def get_recommendations_corr(user_input, top_n=5):
    user_input_processed = ' '.join(preprocess(user_input))
    user_count = vectorizer.transform([user_input_processed])
    user_count_df = pd.DataFrame(user_count.toarray(), columns=vectorizer.get_feature_names_out())
    
    # Calculate the correlation
    correlations = count_df.corrwith(user_count_df.iloc[0], axis=1)
    
    # Get top N recommendations
    recommendations = df.iloc[correlations.nlargest(top_n).index][['Text','link']]
    return recommendations

# Example user input
user_input = "kalini kurta"
recommendations = get_recommendations_corr(user_input)

print(recommendations)

