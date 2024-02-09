import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { FaArrowAltCircleRight } from "react-icons/fa";

const SimilarProductItem = ({ product }) => {
  const handleProductClick = (productId) => {
    // Handle navigation to the product details page for the clicked product
    console.log(`Navigating to product details for product ${productId}`);
  };

  return (
    <div className="similar-product-item">
      <img src={product.image} alt={product.name} />
      <div className="overlay">
        <div className="popup">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <div
            className="view-details"
            onClick={() => {
              handleProductClick(product.id);
              console.log("View details clicked for product:", product.id);
            }}
          >
            <FaArrowAltCircleRight className="arrow-icon" />
            <span>View</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimilarProducts = ({ products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < products.length) {
      setStartIndex(nextIndex);
    } else {
      setStartIndex(0); // Wrap around to the beginning
    }
  };

  const handlePrevious = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    } else {
      setStartIndex(products.length - itemsPerPage); // Wrap around to the end
    }
  };

  return (
    <div className="similar-products">
      <h2>Similar Products:</h2>
      <div className="product-list">
        {products
          .slice(startIndex, startIndex + itemsPerPage)
          .map((product) => (
            <SimilarProductItem key={product.id} product={product} />
          ))}
      </div>
      <div className="navigation-buttons">
        <button className="prev" onClick={handlePrevious}>
          <HiChevronDoubleLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};

// Dummy data for testing
const dummyProducts = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 49.99,
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: 59.99,
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 39.99,
  },
  {
    id: 4,
    name: "Product 4",
    image: "https://via.placeholder.com/150",
    price: 29.99,
  },
  {
    id: 5,
    name: "Product 5",
    image: "https://via.placeholder.com/150",
    price: 29.99,
  },
  {
    id: 6,
    name: "Product 6",
    image: "https://via.placeholder.com/150",
    price: 29.99,
  },
  {
    id: 7,
    name: "Product 7",
    image: "https://via.placeholder.com/150",
    price: 29.99,
  },
  {
    id: 8,
    name: "Product 8",
    image: "https://via.placeholder.com/150",
    price: 29.99,
  },
  // Add more dummy products as needed
];

const SimilarProductsContainer = () => {
  // You can replace dummyProducts with your actual product data
  return <SimilarProducts products={dummyProducts} />;
};

export default SimilarProductsContainer;
