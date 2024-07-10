import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header sticky">
      <div>
        <Link to ="/">
          <img 
            src="https://cdn.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
            alt="logo"
          />
        </Link>
      </div>
      <nav className="categories">
        <ul>
          <li className="dropdown-content1 dropdown-content">
            <a href="mens.html">Men</a>
          </li>
          <li className="dropdown-content2 dropdown-content">
            <a href="">Women</a>
          </li>
          <li className="dropdown-content3 dropdown-content">
            <a href="">Kids</a>
          </li>
          <li className="dropdown-content4 dropdown-content">
            <a href="">Home & Living</a>
          </li>
          <li className="dropdown-content5 dropdown-content">
            <a href="">Beauty</a>
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
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
