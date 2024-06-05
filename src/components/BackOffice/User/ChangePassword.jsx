import React, { useState } from "react";
import SuccessPopup from "../../User_Flow/SuccessPopUp";
import validator from "validator";
import "../../../styles/login.scss";
import { APIRequest } from "../../../helper";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setShowSuccessPopup(false);

    if (!validator.isStrongPassword(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
      );
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    }

    if (passwordError || confirmPasswordError) {
      return;
    }

    // Call API to update password
    await APIRequest("PUT", "Users", {
      CurrentPassword: currentPassword,
      Password: password,
    });

    window.location.href = "/my-cabinet";
  };

  return (
    <div className="new_password-container">
      <h2>Create New Password</h2>
      <p>
        <b>Please create new password for your account</b>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
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

        {showSuccessPopup && (
          <SuccessPopup
            message="You have successfully updated your password!"
            buttonText="My Cabinet Page"
            onClose={() => setShowSuccessPopup(false)}
            buttonLink="/my-cabinet"
          />
        )}
    </div>
  );
};

export default UpdatePassword;
