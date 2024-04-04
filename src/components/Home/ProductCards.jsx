import React, { useState, useEffect } from "react";
import "../../styles/productCards.scss";

const ProductCards = ({ products }) => {
    return (
        <div className="productCards">
            <div>
                {products && products.map((product) => (
                    <div>
                        <img src={product.image} alt={product.name} />
                        <div className="productCards-content">
                            <h3>{product.name}</h3>
                            <button onClick={() => {
                                window.location = product.redirection;
                            }}>VIEW DETAILS</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCards;

