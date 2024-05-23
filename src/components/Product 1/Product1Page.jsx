import React, { useEffect, useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import ProductDetails from "./Product1Details";
import ProductImageGallery from "./ProductImageGallery_1";
import SimilarProductsContainer from "./Similar";

import "../../styles/first_product.scss";
import { useParams } from "react-router-dom";
import { APIRequest, API_URL } from "../../helper";

const ProductPage = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setQuantity] = useState(1);

  // This part will be replaced with your data fetching logic
  const [productData, setProductData] = useState({
    id,
    name: "Danish Styled Sofa",
    availability: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 49.99,
    colors: ["Red", "Blue", "Green"],
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
  });

  useEffect(() => {
    const fetchProductData = async () => {
      const result = await APIRequest("get", `Products?ProductId=${id}`);
      console.log(result);
      setProductData({
        id: result.return.ProductId,
        name: result.return.Name,
        availability: result.return.Stock > 0,
        description: result.return.Description,
        price: result.return.Price,
        colors: ["Red", "Blue", "Green"],
        images: result.return.Pictures.map((picture) => `${API_URL}/${picture.Link}`),
        similarProducts: [
          {
            id: 2,
            name: "Similar Product 1",
            images:
              "https://www.decoraid.com/wp-content/uploads/2021/04/best-2021-sofa-interior-design-scaled.jpeg",
          },
          { id: 3, name: "Similar Product 2" },
        ],
      })
    };



    fetchProductData();
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCart = async () => {
    console.log("Product added to cart:", {
      productId: productData.id,
      selectedColor,
      selectedQuantity,
    });

    await APIRequest("post", "ProductOrder/add", {
      ProductId: productData.id,
      Quantity: selectedQuantity,
    });

    window.location.href = "/cart";
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
            colors={productData.colors}
            description={productData.description}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      <SimilarProductsContainer />
      <Footer />
    </div>
  );
};

export default ProductPage;
