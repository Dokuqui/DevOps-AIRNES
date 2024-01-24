import React, { useState } from "react";
import { categories } from "./CategoryList";
import "../styles/category.scss";

const FilterModal = ({ onClose, onApplyFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    console.log(selectedSubcategory);
  };

  const handleApplyFilter = () => {
    onApplyFilter(selectedCategory, selectedSubcategory);
    onClose();
  };

  return (
    <div className="filter-modal">
      <div className="filter-options">
        <label htmlFor="mainCategory">Main Category:</label>
        <select
          id="mainCategory"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <label htmlFor="subCategory">Subcategory:</label>
            <select
              id="subCategory"
              onChange={(e) => handleSubcategoryChange(e.target.value)}
            >
              <option value="">All Subcategories</option>
              {categories
                .find((category) => category.name === selectedCategory)
                .subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </>
        )}
      </div>
      <button className="filter-btn" onClick={handleApplyFilter}>Apply Filter</button>
      <button className="filter-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default FilterModal;
