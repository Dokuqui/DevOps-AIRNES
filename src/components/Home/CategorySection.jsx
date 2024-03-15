import React, { useState, useEffect } from "react";
import { BsBasket3, BsHeart } from "react-icons/bs";
import "../../styles/categorySection.scss";
import Rate from "./Rate";

const CategorySection = ({ sections }) => {
    return (
        <div className="categorySection">
            {sections && sections.map((section) => (
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
                                            <BsBasket3/>
                                            <div className="separator"></div>
                                            <BsHeart/>
                                        </div>
                                    </>
                                )}
                                {item.isHeader && (
                                    <>
                                        <h3 className="title">{item.title}</h3>
                                        <p className="description">{item.description}</p>
                                        <button className="viewAll">View all</button>
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

