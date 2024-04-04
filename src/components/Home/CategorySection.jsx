import React, { useState, useEffect } from "react";
import { BsBasket3, BsHeart, BsHeartFill } from "react-icons/bs";
import "../../styles/categorySection.scss";
import Rate from "./Rate";

const CategorySection = ({ sections }) => {
    const [sectionsList, setSectionsList] = useState(sections);

    const handleFavoriteClick = (item) => {
        const updatedFavorites = sectionsList.map(section =>
            section.map(sectionItem =>
                sectionItem.id === item.id && !item.isHeader ? { ...sectionItem, isFavorite: !sectionItem.isFavorite } : sectionItem
            )
        );
        setSectionsList(updatedFavorites);
        // Add to favorite callback ...

    };

    const handleAddToCart = (item) => {
        // Add to cart callback ...
    };

    const handleViewAllCategory = (category) => {
        // Go to category by id...
    }

    return (
        <div className="categorySection">
            {sectionsList && sectionsList.map((section) => (
                <div className="section">
                    {section.map((item, index) => {
                        return (
                            <div key={index} className={item.isHeader ? "item section-header" : "item section-item"}>
                                <img src={item.image} />
                                {!item.isHeader && (
                                    <>
                                        <div className="item-content">
                                            <p className="title">{item.title}</p>
                                            <Rate rate={item.rate} />
                                            <p className="price">{item.price}€</p>
                                        </div>
                                        <div className="item-tooltip">
                                            <button className="item-tooltip-button" onClick={() => handleAddToCart(item)}><BsBasket3 /></button>
                                            <div className="separator"></div>
                                            <button className="item-tooltip-button" onClick={() => handleFavoriteClick(item)}>
                                                {item.isFavorite ? <BsHeartFill color="red" /> : <BsHeart />}
                                            </button>
                                        </div>
                                    </>
                                )}
                                {item.isHeader && (
                                    <>
                                        <h3 className="title">{item.title}</h3>
                                        <p className="description">{item.description}</p>
                                        <button className="viewAll" onClick={() => handleViewAllCategory(item)}>View all</button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))

            }
            <button className="loadMore">Load more products</button>
        </div>
    );
};

export default CategorySection;

