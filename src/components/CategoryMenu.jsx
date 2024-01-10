import React, { useState } from "react";
import "../styles/catMenu.scss";

const CategoryMenu = () => {
  // State to track active section
  const [activeSection, setActiveSection] = useState(null);

  // Function to handle section clicks
  const handleSectionClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
  };

  return (
    <div className="category-menu">
      {/* Section: New Arrivals */}
      <div className={`section ${activeSection === "newArrivals" && "active"}`} onClick={() => handleSectionClick("newArrivals")}>
        <div className="title">New Arrivals</div>
      </div>

      {/* Section: Shop by Room */}
      <div className={`section ${activeSection === "shopByRoom" && "active"}`} onClick={() => handleSectionClick("shopByRoom")}>
        <div className="title">Shop by Room</div>
        <div className="category">Bedroom</div>
        <div className="sub-categories">
          <div>Duvet Cover Sets</div>
          <div>Sheets</div>
          <div>Bedspreads & Blankets</div>
          <div>Blankets</div>
          <div>Curtains</div>
          <div>Pillowcases</div>
          <div>Rugs</div>
        </div>
      </div>

      {/* Other Sections... */}

      {/* Section: Shop by Concept */}
      <div className={`section ${activeSection === "shopByConcept" && "active"}`} onClick={() => handleSectionClick("shopByConcept")}>
        <div className="title">Shop by Concept</div>
        <div className="category">Conscious</div>
        <div className="category">Premium Quality</div>
        <div className="category">Classic Collection</div>
      </div>

      {/* Section: Color */}
      <div className={`section ${activeSection === "color" && "active"}`} onClick={() => handleSectionClick("color")}>
        <div className="title">Color</div>
        <div className="color-categories">{/* Color options... */}</div>
      </div>

      {/* Section: Price */}
      <div className={`section ${activeSection === "price" && "active"}`} onClick={() => handleSectionClick("price")}>
        <div className="title">Price</div>
        <div className="price-ranges">{/* Price range options... */}</div>
      </div>
    </div>
  );
};

export default CategoryMenu;
