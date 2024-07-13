import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import "Chatbot.css";
import ChatHistory from "../../components/ChatHistory";
import Loading from "../../components/Loading";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Note I would delete this API key soon for security reasons
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAU8HN1m1ZDq_e1H6zE5mjEwga-p-4axbk"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // call Gemini Api to get a response
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);
      // add Gemeni's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container">
      <h1 className="container-heading">Myntra-Bot</h1>

      <div className="chat-container">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="chatbox">
        <input
          type="text"
          className="inputplace"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="sendmessage"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
      <button
        className="clearchat"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default Chatbot;