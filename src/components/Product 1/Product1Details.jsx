import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import PropTypes from "prop-types";

const ProductDetails = ({
  name,
  availability,
  price,
  materials,
  description,
  selectedMaterial,
  onMaterialChange,
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
      <p>Price: {price} €</p>

      {materials.length > 0 && (
        <>
        <p>Materials: </p>
        <select className="material-options" onChange={(e) => onMaterialChange(e.target.value)}>
          {materials.map((material) => (
            <option
              key={material[0]}
              value={material[0]}
              selected={selectedMaterial === material[0]}
            >
              {material[1]}
            </option>
          ))}
        </select>
        </>
      )}

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
  materials: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  selectedMaterial: PropTypes.string,
  onMaterialChange: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
