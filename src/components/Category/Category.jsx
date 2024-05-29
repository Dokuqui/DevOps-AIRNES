import React from "react";
import PropTypes from "prop-types";
import "../../styles/cat_item.scss";

const CategoryBox = ({ subcategory, filtered }) => {
  if (filtered) {
    return null;
  }

  const handleExplore = () => {
    window.location.href = `/category/${subcategory.id}`;
  }

  console.log("subcategory", subcategory);

  return (
    <div className="subcategory-card" style={{backgroundImage: `url(${subcategory.image})`, backgroundSize: "cover"}}>
      {/* <img src={subcategory.image} alt={subcategory.name} /> */}
      <div className="curtain-overlay">
        <h4>{subcategory.name}</h4>
        <div className="category-info">
          <button onClick={handleExplore}>Explore</button>
        </div>
      </div>
    </div>
  );
};

CategoryBox.propTypes = {
  subcategory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  filtered: PropTypes.bool.isRequired,
};

export default CategoryBox;
