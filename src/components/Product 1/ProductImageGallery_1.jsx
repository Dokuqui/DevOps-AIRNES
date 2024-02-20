// ProductImageGallery.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import Lightbox from "./LightBox";

const ProductImageGallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxOpen(false);
  };

  return (
    <div className="product-image-gallery">
      <div className="main-image-container" onClick={() => openLightbox(0)}>
        <img src={images[0]} alt="Main Product" />
      </div>
      <div className="thumbnail-container">
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="thumbnail"
            onClick={() => openLightbox(index + 1)}
          >
            <img src={image} alt={`Product ${index + 2}`} />
          </div>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          images={images}
          selectedIndex={selectedImage}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

ProductImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductImageGallery;
