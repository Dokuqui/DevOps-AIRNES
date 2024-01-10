import React from "react";
import Header from "./Header";
import Box from "./Banner";
import CategoryMenu from "./CategoryMenu";
// import ProductList from "./ProductList";
import Footer from "./Footer";
import "../styles/category.scss";

const CategoryPage = () => {
  return (
    <div>
      <Header />
      <Box />
      <h2 className="category-title">Category Page</h2>
      <div className="category-container">
        <CategoryMenu />
        {/* <div className="product-list">
          <ProductList />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
