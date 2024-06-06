import React, { useState } from 'react';
import FilterComponent from './FilterComponent';
import '../../styles/category.scss';

const FilterModal = ({ onClose, onApplyFilter, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleFilterChange = (type, value) => {
    if (type === 'category') {
      setSelectedCategory(value);
      setSelectedSubcategory(null);
    } else if (type === 'subcategory') {
      setSelectedSubcategory(value);
    }
  };

  const handleApplyFilter = () => {
    onApplyFilter(selectedCategory, selectedSubcategory);
    onClose();
  };

  return (
    <div className="filter-modal">
      <FilterComponent categories={categories} onFilterChange={handleFilterChange} />
      <button className="filter-btn" onClick={handleApplyFilter}>
        Apply Filter
      </button>
      <button className="filter-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default FilterModal;
