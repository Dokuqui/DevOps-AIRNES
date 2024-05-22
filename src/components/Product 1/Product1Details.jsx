import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import PropTypes from "prop-types";

const ProductDetails = ({
  name,
  availability,
  price,
  colors,
  description,
  selectedColor,
  onColorChange,
  onQuantityChange,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleAddToCartClick = () => {
    // Call the parent component function with the selected color, size, and quantity
    onAddToCart();
  };


  return (
    <div className="product-details">
      <h1>{name}</h1>
      <p className="product-availability">
        Availability:{" "}
        <span
          className={`availability-${availability ? "in-stock" : "expired"}`}
        >
          {availability ? "In Stock" : "Expired"}
        </span>
      </p>
      <p>Price: ${price}</p>

      <div className="color-options">
        <p>Available Colors:</p>
        {colors.map((color) => (
          <div
            key={color}
            className={`color-option ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)} // Call onColorChange with the selected color
          ></div>
        ))}
      </div>

      <div className="product-description">
        <h2>Description:</h2>
        <p>{description}</p>
      </div>

      <div className="quantity-options">
        <p className="quantity-label">Quantity</p>
        <div className="quantity-buttons">
          <button className="minus-button" onClick={handleDecrease}>
            −
          </button>
          <div className="quantity-display">{quantity}</div>
          <button className="plus-button" onClick={handleIncrease}>
            +
          </button>
        </div>
      </div>

      <div className="action-buttons">
        <button className="add-to-cart-button" onClick={handleAddToCartClick}>
          <BiShoppingBag className="button-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  name: PropTypes.string.isRequired,
  availability: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
  onColorChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToWish: PropTypes.func.isRequired,
};

export default ProductDetails;
