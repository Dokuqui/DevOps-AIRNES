import React from "react";
import "../../styles/footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="row-footer">
        <div className="section">
          <h5>Pages</h5>
          <ul className="pages">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/category">Category</a>
            </li>
            <li>
              <a href="/search">Product</a>
            </li>
            <li>
              <a href="/about-us">About us</a>
            </li>
            <li>
              <a href="/contact">Contact us</a>
            </li>
          </ul>
        </div>

        <div className="section">
          <h5>Documents</h5>
          <ul className="pages">
            <li>
              <a href="/cgu">CGU</a>
            </li>
            <li>
              <a href="/cgu">Mentions légales</a>
            </li>
          </ul>
        </div>

        <div className="contact">
          <h5>Contact</h5>
          <address>
            121 King Street, Melbourne 3000
            <br />
            <span>+61 3 8376 6284</span>
            <br />
            <span>contact@airneis.com</span>
          </address>
        </div>
      </div>

      <div className="copiright">
        <p>© {year} Airneis, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
