import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [formData, setFormData] = useState({
    mobileno: '',
    password: '',
  });
  const [alertMessage, setAlertMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const checkCredentials = () => {
    const { mobileno, password } = formData;
    const arr = JSON.parse(localStorage.getItem('details')) || [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].mobileno === mobileno && arr[i].password === password) {
        window.location.href = '/bag'; 
        return;
      }
    }

    setAlertMessage('Invalid Mobile Number or Password');
  };

  const goToSignup = () => {
    window.location.href = '/signup'; 
  };

  return (
    <div>
      <div id="loginbox">
        <img
          src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2021/7/14/1db28809-f3db-48b1-b303-d937716565661626257521634-Banner_Hamburger--2---1-.jpg"
          alt="banner"
        />
        <div className="loginbody">
          <div className="loginheader">
            Login <span id="smallheader">Or </span>Signup
          </div>
          <form id="login">
            <input
              type="text"
              id="mobileno"
              placeholder="Mobile Number"
              value={formData.mobileno}
              onChange={handleInputChange}
            /><br />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </form>
          <p>
            By continuing I agree to the<span className="smallhead"> Terms of Use </span>
            &<span id="small"> Privacy Policy</span>
          </p>
          <p>Don't have an account? <span onClick={goToSignup}>Signup</span></p>
          <div id="alert">{alertMessage && <div>{alertMessage}</div>}</div>
          <div className="continue" onClick={checkCredentials}>CONTINUE</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
