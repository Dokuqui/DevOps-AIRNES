import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";
import HomePage from './Home/Home';
import Product1page from "./Product 1/Product1Page";
import LoginPage from "./User_Flow/LoginPage";
import RegistrationPage from "./User_Flow/RegistrationPage";
import ReinstalPage from "./User_Flow/ReinstalPage";
import NewPasswordPage from "./User_Flow/NewPasswordPage";
import AdminPage from "./BackOffice/Admin/AdminPage";
import UserPage from "./BackOffice/User/UserPage";
import UpdatePassword from "./BackOffice/User/ChangePassword";
import ContactPage from "./Static/Contact";
import AboutPage from "./Static/About";
import CartPage from "./User_Flow/CartPage";
import Error404Page from "./Static/Error404";
import Checkout_Delivery from "./User_Flow/Checkout_Delivery";
import Checkout_Payment from "./User_Flow/Checkout_Payment";
import Checkout_Completed from "./User_Flow/Checkout_Completed";
import CategoryProductPage from "./Category/CategoryProductPage";
import { getUserInfo } from "../helper";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      var userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUserInfo();
  }, []);

  return (
    <Router>
      <Routes>
        {/* base_product */}
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:id" element={<CategoryProductPage />} />
        <Route path="/product/:id" element={<Product1page />} />
        {/* user_flow */}
        {user ? <Route path="/cart" element={<CartPage />} /> : <Route path="/cart" element={<LoginPage />} />}
        <Route path="/checkout/delivery" element={<Checkout_Delivery />} />
        <Route path="/checkout/payment" element={<Checkout_Payment />} />
        <Route path="/order-completed" element={<Checkout_Completed />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/reinstall" element={<ReinstalPage />} />
        <Route path="/new_password" element={<NewPasswordPage />} />
        {/* back_office */}
        {user ? <Route path="/admin/*" element={<AdminPage />} /> : <Route path="/admin/*" element={<LoginPage />} />}
        {user ? <Route path="/my-cabinet" element={<UserPage />} /> : <Route path="/my-cabinet" element={<LoginPage />} />}
        {user ? <Route path="/my-cabinet/update-password" element={<UpdatePassword />} /> : <Route path="/my-cabinet/update-password" element={<LoginPage />} />}
        {/* static-pages */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;