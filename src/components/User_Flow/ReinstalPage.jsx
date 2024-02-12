import React from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import Reinstall from "./Reinstal";

const ReinstalPage = () => {
  return (
    <div>
      <Header />
      <div className="reinstall">
        <Reinstall />
      </div>
      <Footer />
    </div>
  );
};

export default ReinstalPage;