import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuccessPopup from "./SuccessPopUp";
import validator from "validator";
import "../../styles/login.scss";
import { APIRequest } from "../../helper";

const Reinstal = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setShowSuccessPopup(false);

    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Call API to send email
    await APIRequest("POST", "Users/ForgotPassword", { Mail: email });
    
  };

  return (
    <div className="reinstal-container">
      <h2>Forget Password</h2>
      <p>
        <b>
          Please input email which you have register, to have possibility to
          reinstall your password
        </b>
      </p>
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
        <button type="submit" className="reinstal-button">
          Send Email
        </button>
      </form>
      <p className="GoTo">
        Return to <Link to="/login">Login page</Link>
      </p>

        {showSuccessPopup && (
          <SuccessPopup
            message="You have send email successfully, please check your email inbox!"
            buttonText="Login Page"
            onClose={() => setShowSuccessPopup(false)}
            buttonLink="/login"
          />
        )}
    </div>
  );
};

export default Reinstal;
