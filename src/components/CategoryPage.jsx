import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Box from "./Banner";
import FilterButton from "./FilterButton";
import FilterModal from "./FilterModal";
import CategoryMenu from "./CategoryMenu";
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  };


  const handleApplyFilter = useCallback(() => {
    let filteredCategories = categories;

    if (selectedCategory) {
      filteredCategories = filteredCategories.filter(
        (category) => category.name === selectedCategory
      );
    }

    if (selectedSubcategory) {
      filteredCategories = filteredCategories.filter((category) =>
        category.subcategories.some(
          (subcategory) => subcategory.name === selectedSubcategory
        )
      );
    }

    // Update the displayed categories based on the filters
    setDisplayedCategories(filteredCategories);
  }, [selectedCategory, selectedSubcategory, setDisplayedCategories]);

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  useEffect(() => {
    // Update displayed categories whenever filters change
    handleApplyFilter();
  }, [selectedCategory, selectedSubcategory, handleApplyFilter]);

  return (
    <div>
      <Header />
      <Box />
      <h2 className="category-title">Category Page</h2>
      <FilterButton onClick={handleOpenFilterModal} />
      <CategoryMenu
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />
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
