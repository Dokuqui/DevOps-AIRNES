import React, { useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";


const Checkout_Completed = () => {
  return (
    <div>
      <Header />
      <div className="checkoutsection">
        <h1 className="title">Order completed</h1>

        <div className="order-completed">
          <h3>Your order has been completed successfully. Thank you for your purchase.</h3>
          <p>Order number: <span className="order-number">123456789</span></p>
          <button className="btn" onClick={() => window.location.href = "/"}>Back to home</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout_Completed;
