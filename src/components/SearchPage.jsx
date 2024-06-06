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
    const [materials, setMaterials] = useState([]);

    const fetchProducts = async () => {
        setProducts([]);
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

    const fetchMaterials = async () => {
        const response = await APIRequest("GET", "Materials");

        if (response.success) {
            setMaterials(response.data.filter((material) => material.MaterialId !== 1));
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchMaterials();
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
        fetchProducts();
    };


    return (
        <>
            <Header />

            <div className="product-search">
                <div className="search-bar">
                    <input className="input" type="text" placeholder="Table basse!" onChange={(e) => updateSearchParams({ q: e.target.value }) } value={searchParams.get("q") || ""} />
                    <button className="btn" onClick={toggleFilter}>Filter</button>
                </div>
                {filterOpen && (
                    <div className="filter-panel">
                        <button className="btn reset" onClick={handleReset}>Reset</button>
                        <button className="btn close" onClick={toggleFilter}>Close</button>
                        <div className="price-range">
                            <label>
                                Min price €
                                <input className="input" type="number" placeholder="0" onChange={(e) => updateSearchParams({ minPrice: e.target.value })} value={searchParams.get("minPrice") || ""} onWheel={(e) => e.target.blur()} />
                            </label>
                            <label>
                                Max price €
                                <input className="input" type="number" placeholder="1250" onChange={(e) => updateSearchParams({ maxPrice: e.target.value })} value={searchParams.get("maxPrice") || ""} onWheel={(e) => e.target.blur()} />
                            </label>
                        </div>
                        <div className="materials">
                            <label>Materials</label>
                            {materials.map((material, index) => (
                                <div key={index} style={{ cursor: "pointer" }} onClick={() => {
                                    let newMaterials = searchParams.get("materialId")?.split(",").map((mat) => parseInt(mat)) || [];
                                    
                                    if (!searchParams.get("materialId")?.split(",").includes(String(material.MaterialId))) {
                                        newMaterials.push(material.MaterialId);
                                    }
                                    else {
                                        newMaterials = newMaterials.filter((mat) => mat !== material.MaterialId);
                                    }

                                    updateSearchParams({ materialId: newMaterials.join(",") });
                                }}><input type="checkbox" className="input" checked={searchParams.get("materialId")?.split(",").includes(String(material.MaterialId)) ?? false} /> {material.Label}</div>
                            ))}
                        </div>
                        <div className="stock">
                            <label>Stock</label>
                            <div style={{ cursor: "pointer" }} onClick={() => updateSearchParams({ inStock: searchParams.get("inStock") ? "" : 1 })}><input type="checkbox" className="input" checked={searchParams.get("inStock")} /> In stock</div>
                        </div>
                        <div className="categories">
                            <label>Categories</label>
                            {categories.map((category, index) => (
                                <div key={index} style={{ cursor: "pointer" }} onClick={() => {
                                    let newCategories = searchParams.get("categoryId")?.split(",").map((cat) => parseInt(cat)) || [];
                                    
                                    if (!searchParams.get("categoryId")?.split(",").includes(String(category.CategoryId))) {
                                        newCategories.push(category.CategoryId);
                                    }
                                    else {
                                        newCategories = newCategories.filter((cat) => cat !== category.CategoryId);
                                    }

                                    updateSearchParams({ categoryId: newCategories.join(",") });
                                }}><input type="checkbox" className="input" checked={searchParams.get("categoryId")?.split(",").includes(String(category.CategoryId)) ?? false} /> {category.Name}</div>
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

                        if (searchParams.has("categoryId")) {
                            let categories = searchParams.get("categoryId").split(",").map((cat) => parseInt(cat));
                            let productCategories = product.Categories.map((cat) => cat.CategoryId);

                            state = state && categories.some((cat) => productCategories.includes(cat));
                        }

                        if (searchParams.has("materialId")) {
                            let materials = searchParams.get("materialId").split(",").map((mat) => parseInt(mat));
                            let productMaterials = product.Materials.map((mat) => mat.MaterialId);

                            state = state && materials.some((mat) => productMaterials.includes(mat));
                        }

                        if (searchParams.has("inStock")) {
                            state = state && product.Stock > 0;
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