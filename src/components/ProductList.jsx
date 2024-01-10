import React from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  // Dummy data for product list
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    // Add more products as needed
  ];

  return (
    <section>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
