import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuccessPopup from "./SuccessPopUp";
import "../../styles/login.scss";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setShowSuccessPopup(false);

    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (!passwordError && !confirmPasswordError && password.length >= 6) {
      setShowSuccessPopup(true);
      console.log(
        "Reinstallisation passed successful, you have set new password!"
      );
    }
  };

  return (
    <div className="new_password-container">
      <h2>Forgot Password</h2>
      <p>
        <b>Please create new password to access to your account</b>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="password">Create New Password:</label>
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
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordError && (
            <p className="error-message">{confirmPasswordError}</p>
          )}
        </div>

        <button type="submit" className="new_password-button">
          Create Password
        </button>
      </form>

      <Link to="/login" className="button-link">
        {showSuccessPopup && (
          <SuccessPopup
            message="Reinstallisation passed successful, you have set new password!"
            buttonText="Login Page"
            onClose={() => setShowSuccessPopup(false)}
          />
        )}
      </Link>
    </div>
  );
};

export default NewPassword;
