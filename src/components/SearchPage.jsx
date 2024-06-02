import Footer from "./Static/Footer";
import Header from "./Static/Header";
import React, { useEffect, useState } from 'react';
import "../styles/SearchPage.scss";
import { APIRequest, API_URL } from "../helper";
import { useSearchParams } from "react-router-dom";


const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchProducts = async () => {
        const response = await APIRequest("GET", "Products");

        if (response.success) {
            setProducts(response.return);
        }
    }

    const fetchCategories = async () => {
        const response = await APIRequest("GET", "Categories");

        if (response.success) {
            setCategories(response.categories);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
      };
  
    const handleReset = () => {
        setSearchParams({});
    };

    const updateSearchParams = (newParams) => {
        const params = new URLSearchParams(searchParams);
        Object.keys(newParams).forEach(key => {
            if (newParams[key] === "") {
                params.delete(key);
            } else {
                params.set(key, newParams[key]);
            }
        });
        setSearchParams(params);
    };

    return (
        <>
            <Header />

            <div className="product-search">
                <div className="search-bar">
                    <input className="input" type="text" placeholder="Table basse!" onChange={(e) => updateSearchParams({ q: e.target.value }) } value={searchParams.get("q") || ""} />
                    <button className="btn" onClick={toggleFilter}>Filtrer</button>
                </div>
                {filterOpen && (
                    <div className="filter-panel">
                        <button className="btn reset" onClick={handleReset}>Réinitialiser</button>
                        <button className="btn close" onClick={toggleFilter}>Fermer</button>
                        <div className="price-range">
                            <label>
                                Prix min€
                                <input className="input" type="number" placeholder="1100" onChange={(e) => updateSearchParams({ minPrice: e.target.value })} value={searchParams.get("minPrice") || ""} />
                            </label>
                            <label>
                                Prix max€
                                <input className="input" type="number" placeholder="1250" onChange={(e) => updateSearchParams({ maxPrice: e.target.value })} value={searchParams.get("maxPrice") || ""} />
                            </label>
                        </div>
                        <div className="materials">
                            <label>Matériaux</label>
                            <div><input type="checkbox" /> bois</div>
                            <div><input type="checkbox" /> acier inox</div>
                            <div><input type="checkbox" /> plastique</div>
                            <div><input type="checkbox" /> verre</div>
                            <div><input type="checkbox" /> cuivre</div>
                            <div><input type="checkbox" /> aluminium</div>
                        </div>
                        <div className="stock">
                            <label>Stock</label>
                            <div><input type="checkbox" /> en stock</div>
                        </div>
                        <div className="categories">
                            <label>Catégories</label>
                            {categories.map((category, index) => (
                                <div key={index}><input type="checkbox" onChange={(e) => updateSearchParams({ categoryId: e.target.checked ? category.CategoryId : "" })} /> {category.Name}</div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="search-results">
                    {products.filter((product) => {
                        let state = true;
                        
                        if (searchParams.has("q")) {
                            state = state && product.Name.toLowerCase().includes(searchParams.get("q").toLowerCase());
                        }

                        if (searchParams.has("minPrice")) {
                            state = state && product.Price >= searchParams.get("minPrice");
                        }

                        if (searchParams.has("maxPrice")) {
                            state = state && product.Price <= searchParams.get("maxPrice");
                        }

                        return state;
                    }).map((product, index) => (
                        <div key={index} className="result-item" onClick={() => window.location.href = `/product/${product.ProductId}`}>
                            <div className="product-image">
                                <img src={product.Pictures?.[0] ? `${API_URL}/${product.Pictures[0].Link}` : "/image/placeholder.webp"} alt={product.Name} />
                            </div>
                            <div className="product-info">
                                <div className="product-name">{product.Name}</div>
                                <div className="product-price">{product.Price}€</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default SearchPage;