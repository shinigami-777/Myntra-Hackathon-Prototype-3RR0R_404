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
      <nav className="categories">
        <ul>
          
          <li className="dropdown-content6 dropdown-content">
            <a href="/quiz">Quiz</a>
          </li>
          <li className="dropdown-content7 dropdown-content">
            <a href="/trends">Fashion Trends</a>
          </li>
        </ul>
      </nav>

      <div className="search-div">
        <img
          id="searchpng"
          src="https://image.flaticon.com/icons/png/128/49/49116.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Search for products, brands and more"
        />
      </div>
      <div className="chat-button">
          <Link to="/Chatroom">
          <button className="chat-button">Chatroom</button>
          </Link>
      </div>
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
            <button className="login-button">Login</button>
          </Link>
         
        </div>
      </div>
    </header>
  );
}

export default Header;
