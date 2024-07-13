import React , { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './signup.css';
import { auth , db } from "../../firebase/conf.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const loginPage = () => {
  window.location.href = "./login";
};

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  //const [error, setError] = useState(null);
  
  const signIn = async () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)

    // when user is created we store username, email and points(0 at start) in database
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username:username,
      email:email,
      points: 0,
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    alert(errorMessage)
    // ..
  });
  }
  
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
              <a href=" ">Men</a>
            </li>
            <li><a href=" ">Women</a></li>
            <li><a href=" ">Kids</a></li>
            <li><a href=" ">Home & Living</a></li>
            <li><a href=" ">Beauty</a></li>
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
            <a href=" ">
              <img
                id="svg"
                src="https://www.svgrepo.com/show/198180/user-profile.svg"
                alt=""
              />
            </a>
            <div>Profile</div>
          </div>
          <div>
            <a href=" ">
              <img
                id="svg"
                src="https://www.svgrepo.com/show/14970/heart.svg"
                alt=""
              />
            </a>
            <div>Wishlist</div>
          </div>
          <div>
            <a href=" ">
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
          <input type="username" name="Username" id="username" placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)}
            required />
            <input type="email" name="email" id="email" placeholder="Email id" 
            onChange={(e) => setEmail(e.target.value)}
            required />
            <input
              type="password" name="password"  id="password"  placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required />
          </form>
          <div id="alert"></div>
          <br />
          <button className="signinbtn" onClick={signIn}>
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
