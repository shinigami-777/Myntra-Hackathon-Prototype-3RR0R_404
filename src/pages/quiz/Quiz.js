// src/pages/quiz/Quiz.js
import React, { useState } from "react";
import { generateQuiz } from "../../api"; // Adjust the path if necessary
import "./Quiz.css"; // Import the CSS file

const Quiz = () => {
  const [quizData, setQuizData] = useState({
    numQuestions: 5,
    language: "English",
    fashionTheme: "",
    level: "",
  });
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await generateQuiz(quizData);
      setQuiz(response);
      setError(null);
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
    }
  };

  return (
    <div className="quiz-room">
      <div className="container">
        <h1> Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Number of Questions:</label>
            <input
              type="number"
              name="numQuestions"
              value={quizData.numQuestions}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Language:</label>
            <input
              type="text"
              name="language"
              value={quizData.language}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fashion Theme:</label>
            <input
              type="text"
              name="fashionTheme"
              value={quizData.fashionTheme}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Difficulty Level:</label>
            <input
              type="text"
              name="level"
              value={quizData.level}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Generate Quiz</button>
        </form>
        {error && <p className="error">{error}</p>}
        {quiz && (
          <div>
            <h2>Quiz</h2>
            <ul className="quiz-list">
              {quiz.map((q, index) => (
                <li key={index}>
                  <p>Question: {q.question}</p>
                  <p>Options: {q.options.join(", ")}</p>
                  <p>Answer: {q.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
