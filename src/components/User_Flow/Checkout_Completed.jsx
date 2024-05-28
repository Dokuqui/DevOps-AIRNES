import React, { useEffect, useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";
import { APIRequest } from "../../helper";
import { useSearchParams } from "react-router-dom";


const Checkout_Completed = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Header />
      <div className="checkoutsection">
        <h1 className="title">Order completed</h1>

        <div className="order-completed">
          <h3>Your order has been completed successfully. Thank you for your purchase.</h3>
          <p>Order number: <span className="order-number">{searchParams.get("orderId")}</span></p>
          <p>(The validation of your order can take a few minutes, please wait for the confirmation email)</p>
          <button className="btn" onClick={() => window.location.href = "/"}>Back to home</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout_Completed;
