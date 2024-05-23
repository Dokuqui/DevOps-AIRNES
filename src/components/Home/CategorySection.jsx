import React, { useEffect, useState } from "react";
import { BsBasket3, BsHeart, BsHeartFill, BsLink, BsSearch } from "react-icons/bs";
import "../../styles/categorySection.scss";
import Rate from "./Rate";
import { APIRequest, API_URL } from "../../helper";

const CategorySection = () => {
    const [sectionsList, setSectionsList] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(0);

    const fetchCategories = async () => {
        let result = await APIRequest("get", `ProductCategory`);
        
        let newSectionsList = [];

        for (let i = categoryIndex; i < categoryIndex + 2; i++) {
            if (!result.return[i]) {
                break;
            }
            let section = [{
                id: result.return[i].CategoryId,
                title: result.return[i].Name,
                description: result.return[i].Description,
                image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                url: `/category/${result.return[i].CategoryId}`,
                isHeader: true
            }];

            if (!result.return[i].Products[2]) {
                continue;
            }

            for (let j = 0; j < 3; j++) {
                let product = result.return[i].Products[j];
                let products = {
                    id: product.ProductId,
                    title: product.Name,
                    // image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    image: product.Pictures?.[0]?.Link ? `${API_URL}/${product.Pictures[0].Link}` : "/image/placeholder.webp",
                    rate: product.Rate,
                    price: product.Price,
                    isFavorite: false
                };

                section.push(products);
            }

            newSectionsList.push(section);
        }

        setSectionsList(prevSectionsList => [...prevSectionsList, ...newSectionsList]);
    }

    useEffect(() => {
        fetchCategories();
    }, [categoryIndex]);

    const handleFavoriteClick = (item) => {
        const updatedFavorites = sectionsList.map(section =>
            section.map(sectionItem =>
                sectionItem.id === item.id && !item.isHeader ? { ...sectionItem, isFavorite: !sectionItem.isFavorite } : sectionItem
            )
        );
        setSectionsList(updatedFavorites);
        // Add to favorite callback ...
    };

    const handleAddToCart = async (item) => {
        // Add to cart callback ...

        await APIRequest("post", "ProductOrder/add", {
            ProductId: item.id,
            Quantity: 1
        });
    };

    const handleViewAllCategory = (category) => {
        // Go to category by id...
        window.location.href = category.url;
    }

    return (
        <div className="categorySection">
            {sectionsList && sectionsList.map((section, sectionIndex) => (
                <div key={sectionIndex} className="section">
                    {section.map((item, index) => (
                        <div key={index} className={item.isHeader ? "item section-header" : "item section-item"}>
                            <img src={item.image} alt="section" />
                            {!item.isHeader && (
                                <>
                                    <div className="item-content">
                                        <p className="title">{item.title}</p>
                                        {/* <Rate rate={item.rate} /> */}
                                        <p className="price">{item.price}€</p>
                                    </div>
                                    <div className="item-tooltip">
                                        <button className="item-tooltip-button" onClick={() => handleAddToCart(item)}><BsBasket3 /></button>
                                        <div className="separator"></div>
                                        <button className="item-tooltip-button" onClick={() => window.location.href = `/product/${item.id}`}><BsSearch /></button>

                                        {/*<button className="item-tooltip-button" onClick={() => handleFavoriteClick(item)}>
                                            {item.isFavorite ? <BsHeartFill color="red" /> : <BsHeart />}
                                        </button> */}
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
                    ))}
                </div>
            ))}

            <button className="loadMore" onClick={() => setCategoryIndex(prevIndex => prevIndex + 2)}>Load more</button>
        </div>
    );
};

export default CategorySection;
