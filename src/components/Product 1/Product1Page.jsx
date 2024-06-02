import React, { useEffect, useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import ProductDetails from "./Product1Details";
import ProductImageGallery from "./ProductImageGallery_1";
import SimilarProductsContainer from "./Similar";

import "../../styles/first_product.scss";
import { useParams } from "react-router-dom";
import { APIRequest, API_URL } from "../../helper";
import LoadingScreen from "../LoadingScreen";

const ProductPage = () => {
  const { id } = useParams();
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedQuantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // This part will be replaced with your data fetching logic
  const [productData, setProductData] = useState({
    id,
    name: "Danish Styled Sofa",
    availability: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 49.99,
    materials: ["Leather", "Fabric", "Wood"],
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

      if (result.return == null) {
        window.location.href = "/404";
      }
      
      setProductData({
        id: result.return.ProductId,
        name: result.return.Name,
        availability: result.return.Stock > 0,
        description: result.return.Description,
        price: result.return.Price,
        materials: [],
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

      const materials = await APIRequest("get", `ProductMaterial?ProductId=${id}`);

      if (materials.success) {
        console.log(materials.return);
        setProductData((prevData) => ({
          ...prevData,
          materials: materials.return.map((material) => [material.MaterialId, material.Label]),
        }));
      }

      setIsLoading(false);
    };

    fetchProductData();
  }, [id]);

  const handleMaterialChange = (material) => {
    console.log("Material changed:", Number(material));
    setSelectedMaterial(Number(material));
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCart = async () => {
    console.log("Product added to cart:", {
      productId: productData.id,
      selectedMaterial,
      selectedQuantity,
    });

    await APIRequest("post", "ProductOrder/add", {
      ProductId: productData.id,
      Quantity: selectedQuantity,
      MaterialId: selectedMaterial !== 0 ? selectedMaterial : null,
    });

    // window.location.href = "/cart";
  };

  return (
    <div>
      <Header />
      <LoadingScreen isLoading={isLoading}>
        <div className="product-container">
          <div className="product-images">
            <ProductImageGallery images={productData.images} />
          </div>
          <div className="product-details">
            <ProductDetails
              name={productData.name}
              availability={productData.availability}
              price={productData.price}
              materials={productData.materials}
              description={productData.description}
              selectedMaterial={selectedMaterial}
              onMaterialChange={handleMaterialChange}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
        <SimilarProductsContainer />
      </LoadingScreen>
      <Footer />
    </div>
  );
};

export default ProductPage;
