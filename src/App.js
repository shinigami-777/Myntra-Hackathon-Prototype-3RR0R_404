import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Quiz from "./pages/quiz/Quiz";
import Trends from "./pages/trends/Trends";
import Chatroom from './pages/Chatroom/Chatroom';
import Chatbot from "./pages/Chatbot/Chatbot";


import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/Chatroom" element={<Chatroom />} />
          <Route path="/Chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
