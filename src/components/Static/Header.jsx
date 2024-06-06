import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../helper.js"
import '../../styles/header.scss';
import { getUserInfo } from '../../helper.js';
import { BsBasket3, BsPersonCircle } from 'react-icons/bs';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useState(async () => {
    var user = await getUserInfo();
    setUser(user);
  });

  return (
    <div className={`header ${showMenu ? 'show-menu' : ''}`}>
      <div className="top">
        <div className="title">
          <a className='name' href="/">Aìrnes</a>
        </div>
        <Link to={user ? '/my-cabinet' : '/login'}>
          <button className="icon-button">
            <BsPersonCircle />
          </button>
        </Link>
        <Link to="/cart">
          <button className="icon-button">
            <BsBasket3 />
          </button>
        </Link>
        <Link>
        <button className="burger-menu" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        </Link>
        
        <Link to="/search">
        <button className="icon-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
        </Link>
      </div>

      <ul className={`navbar ${showMenu ? 'show-menu' : ''}`}>
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
  );
};

export default Header;
