import React from "react";

const ProductItem = ({ product }) => {
  return (
    <li>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      {/* Add more product details if needed */}
    </li>
  );
};

export default ProductItem;
