import React, { useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import ProductDetails from "./Product1Details";
import ProductImageGallery from "./ProductImageGallery_1";
import SimilarProductsContainer from "./Similar";

import "../../styles/first_product.scss";

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setQuantity] = useState(1);

  // This part will be replaced with your data fetching logic
  const productData = {
    id: 1,
    name: "Danish Styled Sofa",
    availability: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 49.99,
    brand: "apex",
    colors: ["Red", "Blue", "Green"],
    sizes: ["S", "M", "L"],
    images: [
      "https://www.decoraid.com/wp-content/uploads/2021/04/best-2021-sofa-interior-design-scaled.jpeg",
      "https://www.decoraid.com/wp-content/uploads/2021/04/best-2021-sofa-interior-design-scaled.jpeg",
      "https://www.decoraid.com/wp-content/uploads/2021/04/best-2021-sofa-interior-design-scaled.jpeg",
      "https://www.decoraid.com/wp-content/uploads/2021/04/best-2021-sofa-interior-design-scaled.jpeg",
    ],
    similarProducts: [
      {
        id: 2,
        name: "Similar Product 1",
        images:
          "https://www.decoraid.com/wp-content/uploads/2021/04/best-2021-sofa-interior-design-scaled.jpeg",
      },
      { id: 3, name: "Similar Product 2" },
    ],
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToWishList = () => {
    console.log("Product added to wish list:", {
      productId: productData.id,
      selectedColor,
      selectedSize,
      selectedQuantity,
    });
  };

  const handleAddToCart = () => {
    console.log("Product added to cart:", {
      productId: productData.id,
      selectedColor,
      selectedSize,
      selectedQuantity,
    });
  };

  return (
    <div>
      <Header />
      <div className="product-container">
        <div className="product-images">
          <ProductImageGallery images={productData.images} />
        </div>
        <div className="product-details">
          <ProductDetails
            name={productData.name}
            availability={productData.availability}
            price={productData.price}
            brand={productData.brand}
            colors={productData.colors}
            sizes={productData.sizes}
            description={productData.description}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            onAddToWish={handleAddToWishList}
          />
        </div>
      </div>
      <SimilarProductsContainer />
      <Footer />
    </div>
  );
};

export default ProductPage;
