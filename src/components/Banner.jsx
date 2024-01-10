import React from "react";
import "../styles/banner.scss";

const Box = () => {
  return (
    <div className="box">
      <div className="group">
        <div className="overlap-group">
            <p className="member">MEMBER EXCLUSIVE</p>
            <p className="exclusive">15% OFF EVERYTHING + EXTRA $10 OFF FOR PLUS STATUS</p>
          <a href="/">
            <p className="join">NOT A MEMBER? JOIN NOW TO SHOP.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Box;
