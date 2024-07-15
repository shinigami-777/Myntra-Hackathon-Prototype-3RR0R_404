# Myntra-Hackathon-Prototype-3RR0R_404

## Description
This is the Phase 2 submission for the [Myntra HackerRamp: WeForShe 2024](https://unstop.com/hackathons/myntra-hackerramp-weforshe-2024-myntra-1025692) from team 3RR0R_404. <br>The new features and their functionality is implemented over a clone of Myntra Website. The web app is made using React for frontend (Chatrooms and Chatbot) , firebase for login and the trend forecasting ,analysis and customized quiz generation using python. The Gemini - Inference API is used for quiz generation and uptrend/downtrend analysis.
## Steps To host the functional prototype website locally from this Repository
1. Clone the Repo
```sh
git clone https://github.com/shinigami-777/Myntra-Hackathon-Prototype-3RR0R_404.git
```
```sh
cd Myntra-Hackathon-Prototype-3RR0R_404/
```
2. Start the python server (backend). Split the terminals and follow the commands.
```sh
cd src/server/
pip install -r requirements.txt
python app.py
```
If the `pip install -r requirements` command is unable to install the packages then create a python environment and then run it.

3. Start the website (frontend). In the other terminal follow the commands.
```sh
npm install
npm start
```
## Features Implemented
### The Trends Route
The trends route provides comprehensive insights into fashion trends through three key features that are implemented by the Machine Learning model.
(trends pic goes here)

1. **Recommender System**: Users can input specific fashion-related keywords, and the system generates personalized recommendations based on extensive data correlations obtained from scraping Myntra's website. This ensures that users receive relevant and trendy fashion suggestions tailored to their interests.

2. **Keyword Suggestion Generation**: Based on the recommendations provided by the system, the tool suggests additional related keywords to help users explore further trends. These suggestions are complemented with Google search volume comparative plots, offering a visual representation of how popular each keyword is over time. 

3. **File Upload for Trends Forecasting**: Here one can upload CSV files containing data they wish to analyze. The system processes the file and forecasts fashion trends based on the uploaded data. It then provides automated suggestions on whether investing in a particular fashion trend is advisable over the next five months. The feature makes use of a two layer LSTM for forecasting within 10 seconds along with LLM generated insights.

### The Chatbot Route
A chatbot made using the Google Gemini API that  aims to assist users in making informed and stylish fashion choices through an interactive and user-friendly interface.
(chatbot pic goes here)
1. **Enhanced Customization**: Enable users to provide detailed preferences, such as favorite colors, preferred styles, and specific occasions.

2. **E-commerce Integration**: Facilitate direct purchases of recommended items through integration with e-commerce platforms.

3. **Expanded Fashion Database**: Continuously update the fashion database to include the latest trends and collections from various designers and brands.

### The Chatrooms Route
This feature enables users to interact with each other in real-time, discuss fashion preferences, and share images. It also stores previous messages, allowing users to maintain ongoing conversations and create multiple chatrooms for group discussions. The backend database for this is created using another website where the messages and records are being stored.
(chatroom pic here)
1. **User Authentication**: Users sign up or log in to the myntra website.
2. **Chatroom Creation**: Users can create multiple new chatrooms or join existing ones.
3. **Real-time Messaging**: Users send and receive messages instantly.
4. **Image Sharing**: Users can upload and share images within the chatrooms.
5. **Message Storage**: All messages are stored in the backend, allowing users to access previous conversations.
6. **User Preferences Discussion**: Users can discuss their fashion preferences, share tips, and receive feedback from others.

### The Quiz Route
The Gemini - Inference API is used for quiz generation. The users can customize the quizzes as they like. The functional backend where the quiz generation works is shown in this prototype. The quiz room is a part of the Chatrom where users will initiate the Quizzes. Users will be able to generate and play quiz games with their friends and other users. The frontend for the quiz route shall be made accordingly.
(quiz pic here)
1. **Customizable Quiz Creation**: Users can customize their quiz by selecting the language of the quiz, the number of questions, the fashion theme , and the difficulty level (easy, medium, or hard). The system uses advanced AI to generate quiz questions and options automatically, ensuring that the quizzes are both relevant and challenging, catering to different user preferences and knowledge levels.

2. **Interactive Gamification**: The quizzes are designed to be interactive and engaging. This gamification element helps to attract and retain the interest of younger audiences, encouraging them to learn more about fashion and stay connected with Myntra. By making learning fun, the quizzes foster a deeper investment in fashion topics and the Myntra platform.
