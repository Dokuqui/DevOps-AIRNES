import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";
import HomePage from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;