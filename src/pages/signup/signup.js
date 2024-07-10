import React from 'react';
import { Link } from 'react-router-dom'; 
import './signup.css'; 
function Signup() {
  const storeDetails = (e) => {
    e.preventDefault(); // 
    const form = document.getElementById("formContainer");

    const username = form.username.value;
    const mobileno = form.mobileno.value;
    const email = form.email.value;
    const password = form.password.value;

    if (username.length === 0 || mobileno.length === 0 || email.length === 0 || password.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = "Please fill all the details";
      const alert = document.getElementById("alert");
      alert.innerHTML = null;
      alert.append(div);

      return;
    }

    const location = {
      username,
      mobileno,
      email,
      password,
    };

    let arr = localStorage.getItem("details");

    if (arr === null) {
      arr = [];
    } else {
      arr = JSON.parse(arr);
    }

    arr.push(location);
    localStorage.setItem("details", JSON.stringify(arr));

    form.username.value = "";
    form.mobileno.value = "";
    form.email.value = "";
    form.password.value = "";

    window.location.href = "./login";
  };

  const loginPage = () => {
    window.location.href = "./login";
  };

  return (
    <div>
      <div className="header sticky">
        <div>
          <Link to="/">
            <img
              src="https://cdn.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="categories">
          <ul>
            <li className="dropdown-content">
              <a href="mens.html">Men</a>
            </li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Home & Living</a></li>
            <li><a href="#">Beauty</a></li>
          </ul>
        </div>
        <div className="search-div">
          <img
            id="searchpng"
            src="https://image.flaticon.com/icons/png/128/49/49116.png"
            alt=""
          />
          <input type="text" placeholder="Search for products, brands and more" />
        </div>
        <div className="nav-last">
          <div>
            <a href="#">
              <img
                id="svg"
                src="https://www.svgrepo.com/show/198180/user-profile.svg"
                alt=""
              />
            </a>
            <div>Profile</div>
          </div>
          <div>
            <a href="#">
              <img
                id="svg"
                src="https://www.svgrepo.com/show/14970/heart.svg"
                alt=""
              />
            </a>
            <div>Wishlist</div>
          </div>
          <div>
            <a href="#">
              <img
                id="svg"
                src="https://www.svgrepo.com/show/17522/bag.svg"
                alt=""
              />
            </a>
            <div>Bag</div>
          </div>
        </div>
      </div>
      <div id="signinbox">
        <div id="textbox">
          <div id="signintext">
            <p className="signinheader">CREATE A NEW ACCOUNT</p>
          </div>
          <form id="formContainer">
            <input type="text" name="username" id="username" placeholder="Username" required />
            <input
              type="tel"
              name="mobileno"
              id="mobileno"
              placeholder="Mobile Number"
              required
            />
            <input type="email" name="email" id="email" placeholder="Email id" required />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </form>
          <div id="alert"></div>
          <br />
          <button className="signinbtn" onClick={storeDetails}>
            SIGN UP
          </button>
          <br />
          <p style={{ textAlign: 'center' }}>
            Already have an account? <span onClick={loginPage}>Click Here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
