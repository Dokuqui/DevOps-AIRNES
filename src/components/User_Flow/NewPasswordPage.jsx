import React from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import NewPassword from "./NewPassword"

const NewPasswordPage = () => {
  return (
    <div>
      <Header />
      <div className="new_password">
        <NewPassword />
      </div>
      <Footer />
    </div>
  );
};

export default NewPasswordPage;