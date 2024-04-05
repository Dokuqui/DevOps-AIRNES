import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuccessPopup from "./SuccessPopUp";
import "../../styles/login.scss";

const Reinstal = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setShowSuccessPopup(false);

    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    }

    if (!emailError) {
      setShowSuccessPopup(true);
      console.log(
        "You have send email successfully, please check your email inbox!"
      );
    }
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
