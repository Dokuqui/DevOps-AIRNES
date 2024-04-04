import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";
import HomePage from './Home';
import Product1page from "./Product 1/Product1Page";
import LoginPage from "./User_Flow/LoginPage";
import RegistrationPage from "./User_Flow/RegistrationPage";
import ReinstalPage from "./User_Flow/ReinstalPage";
import NewPasswordPage from "./User_Flow/NewPasswordPage";
import AdminPage from "./BackOffice/Admin/AdminPage";
import UserPage from "./BackOffice/User/UserPage";
import UpdatePassword from "./BackOffice/User/ChangePassword";

const App = () => {
  return (
    <Router>
      <Routes id="base_product">
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/first_product" element={<Product1page />} />
      </Routes>
      <Routes id="user_flow">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/reinstall" element={<ReinstalPage />} />
        <Route path="/new_password" element={<NewPasswordPage />} />
      </Routes>
      <Routes id="back_office">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/my-cabinet" element={<UserPage />} />
        <Route path="/my-cabinet/update-password" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
};

export default App;