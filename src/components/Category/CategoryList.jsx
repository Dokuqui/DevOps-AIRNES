import React, { useState, useEffect } from "react";
import CategoryBox from "./Category";
import Pagination from "../Pagination";
import "../../styles/category.scss";

const categories = [
  {
    id: 1,
    name: "Living Room",
    subcategories: [
      { id: 11, name: "Sofas" },
      { id: 12, name: "Coffee Tables" },
      { id: 13, name: "TV Stands" },
      { id: 14, name: "Bookshelves" },
      { id: 15, name: "Lounge Chairs" },
      { id: 16, name: "Ottomans" },
    ],
  },
  {
    id: 2,
    name: "Bedroom",
    subcategories: [
      { id: 21, name: "Beds" },
      { id: 22, name: "Dressers" },
      { id: 23, name: "Nightstands" },
      { id: 24, name: "Mattresses" },
      { id: 25, name: "Wardrobes" },
      { id: 26, name: "Bedding Sets" },
    ],
  },
  {
    id: 3,
    name: "Kitchen",
    subcategories: [
      { id: 21, name: "Dining Tables" },
      { id: 22, name: "Chairs" },
      { id: 23, name: "Bar Stools" },
      { id: 24, name: "Kitchen Islands" },
      { id: 25, name: "Cookware" },
      { id: 26, name: "Cutlery Sets" },
    ],
  },
  {
    id: 4,
    name: "Bathroom",
    subcategories: [
      { id: 21, name: "Vanities" },
      { id: 22, name: "Medicine Cabinets" },
      { id: 23, name: "Towel Racks" },
      { id: 24, name: "Shower Curtains" },
      { id: 25, name: "Bath Mats" },
      { id: 26, name: "Bathroom Accessories" },
    ],
  },
  {
    id: 5,
    name: "Office",
    subcategories: [
      { id: 21, name: "Desks" },
      { id: 22, name: "Office Chairs" },
      { id: 23, name: "Bookcases" },
      { id: 24, name: "Filing Cabinets" },
      { id: 25, name: "Desk Lamps" },
      { id: 26, name: "Office Decor" },
    ],
  },
];

const CategoryList = ({
  itemsPerPage,
  currentPage,
  onPageChange,
  filterCriteria,
}) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCategories = filterCriteria
    ? filteredCategories.slice(startIndex, endIndex)
    : categories.slice(startIndex, endIndex);

  useEffect(() => {
    const filtered = filterCriteria
      ? categories.filter((category) => category.name === filterCriteria)
      : categories;

    setFilteredCategories(filtered);
  }, [filterCriteria]);

  return (
    <div>
      {displayedCategories.map((category) => (
        <div key={category.id} className="category-name">
          <h3>{category.name}</h3>
          <div className="category-list">
            {category.subcategories.map((subcategory) => (
              <CategoryBox key={subcategory.id} subcategory={subcategory} />
            ))}
          </div>
        </div>
      ))}
      <Pagination
        totalPages={Math.ceil(filteredCategories.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export { CategoryList, categories };
