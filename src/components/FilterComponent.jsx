import React, { useState, useEffect } from "react";

const FilterComponent = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange("category", category);
  };

  const handleSubcategoryChange = (subcategory) => {
    onFilterChange("subcategory", subcategory);
  };

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].name);
      onFilterChange("category", categories[0].name);
    }
  }, [categories, selectedCategory, onFilterChange]);

  return (
    <div className="filter-options">
      <label htmlFor="mainCategory">Main Category:</label>
      <select
        id="mainCategory"
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={selectedCategory}
      >
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
  );
};

export default FilterComponent;
