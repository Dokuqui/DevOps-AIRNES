import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Box from "./Banner";
import FilterButton from "./FilterButton";
import FilterModal from "./FilterModal";
import { CategoryList, categories } from "./CategoryList";
import Footer from "./Footer";
import "../styles/category.scss";

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const itemsPerPage = 3;

  const [displayedCategories, setDisplayedCategories] = useState(categories);

  React.useEffect(() => {
    setDisplayedCategories(categories);
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
      <Box />
      <h2 className="category-title">Category Page</h2>
      <FilterButton onClick={handleOpenFilterModal} />
      <div className="category-sub">
        <CategoryList
          categories={displayedCategories}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          filterCriteria={selectedCategory}
        />
      </div>
      {isFilterModalOpen && (
        <FilterModal
          onClose={handleCloseFilterModal}
          onApplyFilter={handleApplyFilter}
        />
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
