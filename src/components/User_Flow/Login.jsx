import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuccessPopup from "./SuccessPopUp";
import "../../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setShowSuccessPopup(false);

    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }

    if (!emailError && !passwordError && password.length >= 6) {
      setShowSuccessPopup(true);
      console.log("Login successful");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="forget">
        <Link to="/reinstall">Forgot Password?</Link>
      </p>
      <p className="GoTo">
        Still no account? <Link to="/registration">Go to registration</Link>
      </p>

      {showSuccessPopup && (
        <SuccessPopup
          message="Login successful!"
          buttonText="Home Page"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
};

export default Login;
