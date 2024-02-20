import React from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import Login from "./Login";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="login">
        <Login />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
