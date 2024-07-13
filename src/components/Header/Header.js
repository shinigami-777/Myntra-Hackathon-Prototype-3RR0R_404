// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header sticky">
      <div>
        <Link to="/">
          <img
            src="https://cdn.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
            alt="logo"
          />
        </Link>
      </div>
      
      <Link to="/quiz">
        <button className="button-common quiz-button">Quiz Room</button>
      </Link>
      <Link to="/trends">
        <button className="button-common trends-button">Fashion Trends</button>
      </Link>
     
      <Link to="/Chatbot">
        <button className="button-common chatbot-button">Chatbot</button>
      </Link>
      <Link to="/Chatroom">
        <button className="button-common chat-button">Chatroom</button>
      </Link>
      <div className="nav-last">
        <div>
          <a href="">
            <img
              id="svg"
              src="https://www.svgrepo.com/show/198180/user-profile.svg"
              alt=""
            />
          </a>
          <div>Profile</div>
        </div>

        <div>
          <a href="">
            <img
              id="svg"
              src="https://www.svgrepo.com/show/14970/heart.svg"
              alt=""
            />
          </a>
          <div>Wishlist</div>
        </div>

        <div>
          <a href="">
            <img
              id="svg"
              src="https://www.svgrepo.com/show/17522/bag.svg"
              alt=""
            />
          </a>
          <div>Bag</div>
        </div>

        <div className="auth-buttons">
          <Link to="/login">
            <button className="button-common login-button">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
