import React from "react";
import PropTypes from "prop-types";
import "../styles/cat_item.scss";

const CategoryBox = ({ subcategory, filtered }) => {
  if (filtered) {
    // If filtered is true, the component is hidden
    return null;
  }
  return (
    <div className="subcategory-card">
      {/* <img src={subcategory.image} alt={subcategory.name} /> */}
      <h4>{subcategory.name}</h4>
      <div className="category-info">
        <button>Explore</button>
      </div>
    </div>
  );
};

CategoryBox.propTypes = {
  subcategory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    // Add more PropTypes as needed
  }).isRequired,
  filtered: PropTypes.bool.isRequired,
};

export default CategoryBox;
