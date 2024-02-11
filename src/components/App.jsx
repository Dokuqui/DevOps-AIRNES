import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";
import Product1page from "./Product 1/Product1Page";
import LoginPage from "./User_Flow/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/first_product" element={<Product1page />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
