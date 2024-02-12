import React from "react";
import "../../styles/successpop.scss"

const SuccessPopup = ({ message, buttonText, onClose }) => {
  return (
    <div className="success-popup">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <p>{message}</p>
        {buttonText && <button onClick={onClose} className="modal-button">{buttonText}</button>}
      </div>
    </div>
  );
};

export default SuccessPopup;
