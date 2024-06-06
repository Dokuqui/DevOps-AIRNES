import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuccessPopup from "./SuccessPopUp";
import "../../styles/login.scss";
import { APIRequest } from "../../helper";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstnameError("");
    setLastnameError("");
    setShowSuccessPopup(false);

    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
    }

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

    if (!firstname) {
      setFirstnameError("Firstname is required");
    }

    if (!lastname) {
      setLastnameError("Lastname is required");
    }

    if (!emailError && !passwordError && !confirmPasswordError && !firstnameError && !lastnameError && password.length >= 6) {

      let response = await APIRequest("post", "Users", {
        Firstname: firstname,
        Lastname: lastname,
        Mail: email,
        Password: password,
      });

      if (!response.success) {
        console.log(response.return);
        return;
      }

      localStorage.setItem("Token", response.return.Token);

      setShowSuccessPopup(true);
      // console.log("Inscription réussie");
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          {firstnameError && <p className="error-message">{firstnameError}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          {lastnameError && <p className="error-message">{lastnameError}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Create a password:</label>
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
          <label htmlFor="confirm-password">Confirm your password:</label>
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
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="GoTo">
        Already have an account ? <Link to="/login">Login</Link>
      </p>

      {showSuccessPopup && (
        <SuccessPopup
          message="Registration successful"
          buttonText="Login page"
          onClose={() => {
            setShowSuccessPopup(false);
            window.location.href = "/";
          }}
        />
      )}
    </div>
  );
};

export default Registration;
