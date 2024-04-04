import React, { useState, useEffect } from "react";
import "../../styles/categorySection.scss";

const Rate = ({rate}) => {
    const fullStar = Math.floor(rate);
    const emptyStar = 5 - fullStar;


    const Star = ({ filled }) => (
        <svg width="15" height="15" viewBox="0 0 24 24">
            <path
                d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.847 1.416 8.251L12 18.896l-7.415 3.9 1.416-8.251-6.001-5.847 8.332-1.209L12 .587z"
                fill={filled ? "#FFC107" : "#E0E0E0"}
            />
        </svg>
    );

    return (
        <div>
            {Array.from({ length: fullStar }, (_, i) => (
                <Star key={i} filled={true} />
            ))}
            {Array.from({ length: emptyStar }, (_, i) => (
                <Star key={i} filled={false} />
            ))}
        </div>
    );
};

export default Rate;

