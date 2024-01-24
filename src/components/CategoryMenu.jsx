import React, { useState } from "react";
import "../styles/catMenu.scss";

const CategoryMenu = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
    setActiveSubCategory(null);
  };

  const handleSubCategoryClick = (section, subCategory) => {
    setActiveSubCategory(
      activeSubCategory === subCategory ? null : subCategory
    );
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const handlePriceClick = (e) => {
    e.stopPropagation();
    setActiveSection(activeSection === "price" ? null : "price");
    setActiveSubCategory(null);
  };

  const handleColorClick = (e) => {
    e.stopPropagation();
    setActiveSection(activeSection === "color" ? null : "color");
    setActiveSubCategory(null);
  };

  const colorOptions = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

  return (
    <div className={`category-menu ${isMenuOpen ? "open" : ""}`}>
      <button className="burger-menu" onClick={handleToggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>
      <div
        className={`section ${activeSection === "newArrivals" && "active"}`}
        onClick={() => handleSectionClick("newArrivals")}
      >
        <div className="title">New Arrivals</div>
      </div>

      <div
        className={`section ${activeSection === "shopByRoom" && "active"}`}
        onClick={() => handleSectionClick("shopByRoom")}
      >
        <div className="title">Shop by Room</div>
        <div
          className={`category ${
            activeSubCategory === "Living Room" && "active"
          }`}
          onClick={(e) => {
            handleSubCategoryClick("shopByRoom", "Living Room");
            e.stopPropagation();
          }}
        >
          Living Room
        </div>
        <div
          className={`sub-categories ${
            activeSubCategory === "Living Room" && "visible"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sub-category">Sofas</div>
          <div className="sub-category">Coffee Tables</div>
          <div className="sub-category">TV Stands</div>
          <div className="sub-category">Bookshelves</div>
          <div className="sub-category">Lounge Chairs</div>
          <div className="sub-category">Ottomans</div>
        </div>
        <div
          className={`category ${activeSubCategory === "Bedroom" && "active"}`}
          onClick={(e) => {
            handleSubCategoryClick("shopByRoom", "Bedroom");
            e.stopPropagation();
          }}
        >
          Bedroom
        </div>
        <div
          className={`sub-categories ${
            activeSubCategory === "Bedroom" && "visible"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sub-category">Beds</div>
          <div className="sub-category">Dressers</div>
          <div className="sub-category">Nightstands</div>
          <div className="sub-category">Mattresses</div>
          <div className="sub-category">Wardrobes</div>
          <div className="sub-category">Bedding Sets</div>
        </div>

        <div
          className={`category ${activeSubCategory === "Kitchen" && "active"}`}
          onClick={(e) => {
            handleSubCategoryClick("shopByRoom", "Kitchen");
            e.stopPropagation();
          }}
        >
          Kitchen
        </div>
        <div
          className={`sub-categories ${
            activeSubCategory === "Kitchen" && "visible"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sub-category">Dining Tables</div>
          <div className="sub-category">Chairs</div>
          <div className="sub-category">Bar Stools</div>
          <div className="sub-category">Kitchen Islands</div>
          <div className="sub-category">Cookware</div>
          <div className="sub-category">Cutlery Sets</div>
        </div>

        <div
          className={`category ${activeSubCategory === "Bathroom" && "active"}`}
          onClick={(e) => {
            handleSubCategoryClick("shopByRoom", "Bathroom");
            e.stopPropagation();
          }}
        >
          Bathroom
        </div>
        <div
          className={`sub-categories ${
            activeSubCategory === "Bathroom" && "visible"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sub-category">Vanities</div>
          <div className="sub-category">Medicine Cabinets</div>
          <div className="sub-category">Towel Racks</div>
          <div className="sub-category">Shower Curtains</div>
          <div className="sub-category">Bath Mats</div>
          <div className="sub-category">Bathroom Accessories</div>
        </div>

        <div
          className={`category ${activeSubCategory === "Office" && "active"}`}
          onClick={(e) => {
            handleSubCategoryClick("shopByRoom", "Office");
            e.stopPropagation();
          }}
        >
          Office
        </div>
        <div
          className={`sub-categories ${
            activeSubCategory === "Office" && "visible"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="sub-category">Desks</div>
          <div className="sub-category">Office Chairs</div>
          <div className="sub-category">Bookcases</div>
          <div className="sub-category">Filing Cabinets</div>
          <div className="sub-category">Desk Lamps</div>
          <div className="sub-category">Office Decor</div>
        </div>
      </div>

      <div
        className={`section ${activeSection === "shopByConcept" && "active"}`}
        onClick={(e) => {
          handleSectionClick("shopByConcept");
          e.stopPropagation();
        }}
      >
        <div className="title">Shop by Concept</div>
        <div className="category">Conscious</div>
        <div className="category">Premium Quality</div>
        <div className="category">Classic Collection</div>
      </div>

      <div
        className={`section ${activeSection === "color" && "active"}`}
        onClick={handleColorClick}
      >
        <div className="title">Color</div>
        <div
          className={`color-categories ${
            activeSection === "color" ? "visible" : ""
          }`}
        >
          {colorOptions.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>

      <div
        className={`section ${activeSection === "price" && "active"}`}
        onClick={handlePriceClick}
      >
        <div className="title">Price</div>
        <div
          className={`price-ranges ${
            activeSection === "price" ? "visible" : ""
          }`}
        >
          <label htmlFor="minPrice">Min Price:</label>
          <div className="price-input-container">
            <input
              type="number"
              id="minPrice"
              className="input"
              value={minPrice}
              onChange={handleMinPriceChange}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
          <label htmlFor="maxPrice">Max Price:</label>
          <div className="price-input-container">
            <input
              type="number"
              id="maxPrice"
              className="input"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
