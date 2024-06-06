import React, { useEffect, useState } from "react";
import SuccessPopup from "./SuccessPopUp";
import validator from "validator";
import "../../styles/login.scss";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { APIRequest } from "../../helper";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setShowSuccessPopup(false);

    if (!validator.isStrongPassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (passwordError || confirmPasswordError) {
      return;
    }

    await APIRequest("POST", "Users/ResetPassword", {
      Token: searchParams.get("token"),
      Password: password,
    });

    setShowSuccessPopup(true);
  };


  const checkToken = async () => {
    console.log(searchParams.get("token"));

    const response = await APIRequest("POST", `Users/CheckToken`, {
      Token: searchParams.get("token"),
    });

    if (!response.success) {
      window.location.href = "/404";
      return;
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <LoadingScreen isLoading={isLoading}>
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

        {showSuccessPopup && (
          <SuccessPopup
            message="Reinstallisation passed successful, you have set new password!"
            buttonText="Login Page"
            onClose={() => setShowSuccessPopup(false)}
            buttonLink="/login"
          />
        )}
    </div>
    </LoadingScreen>
  );
};

export default NewPassword;
