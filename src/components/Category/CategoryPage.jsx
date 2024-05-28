import React, { useState, useEffect, useCallback } from "react";
import Header from "../Static/Header";
import Box from "./Banner";
import FilterButton from "../Filter/FilterButton";
import FilterModal from "../Filter/FilterModal";
import { CategoryList } from "./CategoryList";
import Footer from "../Static/Footer";
import "../../styles/category.scss";
import { APIRequest } from "../../helper";

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const itemsPerPage = 3;

  const [displayedCategories, setDisplayedCategories] = useState(categories);

  const fetchCategories = async () => {
    let result = await APIRequest("get", "CategorieRoom");

    let newCategories = result.return.map((room) => ({
      id: room.RoomId,
      name: room.Name,
      subcategories: room.Categories.map((category) => ({
        id: category.CategoryId,
        name: category.Name,
        image: category.Pictures?.[0]?.Link || "/image/placeholder.webp",
      })),
    }));

    setCategories(newCategories);
  }

  useEffect(() => {
    setDisplayedCategories(categories);

    fetchCategories();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleApplyFilter = useCallback(() => {
    let filteredCategories = categories;

    if (selectedCategory) {
      filteredCategories = filteredCategories.filter(
        (category) => category.name === selectedCategory
      );
    }

    if (selectedSubcategory) {
      filteredCategories = filteredCategories.map((category) => ({
        ...category,
        subcategories: category.subcategories.filter(
          (subcategory) => subcategory.name === selectedSubcategory
        ),
      }));
    }

    setDisplayedCategories(filteredCategories);
  }, [selectedCategory, selectedSubcategory]);

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  useEffect(() => {
    handleApplyFilter();
  }, [selectedCategory, selectedSubcategory, handleApplyFilter]);

  return (
    <div>
      <Header />
      {/* <Box /> */}
      <h2 className="category-title">Category Page</h2>
      <FilterButton onClick={handleOpenFilterModal} />
      <div className="category-sub">
        <CategoryList
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          filterCriteria={selectedCategory}
          categories={categories}
        />
      </div>
      {isFilterModalOpen && (
        <FilterModal
          onClose={handleCloseFilterModal}
          onApplyFilter={handleApplyFilter}
          categories={categories}
        />
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
