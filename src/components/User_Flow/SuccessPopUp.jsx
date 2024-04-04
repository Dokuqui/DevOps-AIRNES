import React from "react";
import "../../styles/successpop.scss"

const SuccessPopup = ({ message, buttonText, onClose, buttonLink }) => {
  return (
    <div className="success-popup">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <p>{message}</p>
        {buttonText && buttonLink && (
          <button onClick={() => {
            onClose();
            window.location.href = buttonLink; // Navigate to the specified link
          }} 
          className="modal-button">
            {buttonText}
          </button>
        )}
        {buttonText && !buttonLink && (
          <button onClick={onClose} className="modal-button">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessPopup;
