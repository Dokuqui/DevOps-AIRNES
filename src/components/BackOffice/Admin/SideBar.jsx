import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { SiHomebridge } from "react-icons/si";
import { IoLogOutSharp } from "react-icons/io5";
import { adminUser } from "../../User_Flow/Login";
import "../../../styles/sidebar.scss";

const Sidebar = ({ logout }) => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="nav">
          <Link to="#" className="nav-icon" onClick={showSidebar}>
            <FaIcons.FaBars />
          </Link>
          <h1 className="nav-title">AIRNES</h1>
          <div className="user-info">
            <p className="username">{adminUser.name.toUpperCase()}</p>
            <button className="logout-btn" onClick={handleLogout}>
              <IoLogOutSharp />
            </button>
          </div>
        </div>
        <nav className={sidebar ? "sidebar-nav active" : "sidebar-nav"}>
          <div className="sidebar-wrap">
            <Link to="#" className="nav-icon" onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
            <ul className="sidebar-list">
              <li>
                <Link
                  to="/category"
                  className="nav-icon-home"
                  onClick={showSidebar}
                >
                  <SiHomebridge /> Home
                </Link>
              </li>
              <li>
                <Link to="/admin" onClick={showSidebar}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/users" onClick={showSidebar}>
                  User Management
                </Link>
              </li>
              <li>
                <Link to="/admin/content" onClick={showSidebar}>
                  Content Management
                </Link>
              </li>
              <li>
                <Link to="/admin/categories" onClick={showSidebar}>
                  Category Management
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
