import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";
import Product1page from "./Product 1/Product1Page";
import LoginPage from "./User_Flow/LoginPage";
import RegistrationPage from "./User_Flow/RegistrationPage";
import ReinstalPage from "./User_Flow/ReinstalPage";
import NewPasswordPage from "./User_Flow/NewPasswordPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/first_product" element={<Product1page />} />
      </Routes>
      <Routes id="user_flow">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/reinstall" element={<ReinstalPage />} />
        <Route path="/new_password" element={<NewPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
