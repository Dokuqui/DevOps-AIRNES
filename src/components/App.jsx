import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
