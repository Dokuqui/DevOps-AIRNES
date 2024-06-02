import React, { useState, useEffect, useCallback } from "react";
import Header from "../Static/Header";
import Box from "./Banner";
import FilterButton from "../Filter/FilterButton";
import FilterModal from "../Filter/FilterModal";
import { CategoryList } from "./CategoryList";
import Footer from "../Static/Footer";
import "../../styles/category.scss";
import { APIRequest, API_URL } from "../../helper";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    let result = await APIRequest("get", "CategorieRoom");

    let newCategories = result.return.map((room) => ({
      id: room.RoomId,
      name: room.Name,
      subcategories: room.Categories.map((category) => ({
        id: category.CategoryId,
        name: category.Name,
        image: category.Pictures?.[0]?.Link ? `${API_URL}/${category.Pictures[0].Link}` : "/image/placeholder.webp"
      })),
    }));

    setCategories(newCategories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <div>
      <Header />
      {/* <Box /> */}
      <h2 className="category-title">Category Page</h2>
      <div className="category-sub">
        <CategoryList
          categories={categories}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
