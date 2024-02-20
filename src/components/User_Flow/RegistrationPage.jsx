import React from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import Registration from "./Registration";

const RegistrationPage = () => {
  return (
    <div>
      <Header />
      <div className="registration">
        <Registration />
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;