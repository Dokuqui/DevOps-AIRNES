import { useParams } from "react-router";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/categoryproduct.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdFirstPage, MdLastPage, MdChevronRight, MdChevronLeft } from "react-icons/md";
import Rate from "../Home/Rate";
import { APIRequest } from "../../helper";

const CategoryProductPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    
    const [searchParam, setsearchParam] = useSearchParams();

    const page = searchParam.get("page") > 0 ? searchParam.get("page") : 1;
    const limit = 25;

    const fetchProducts = async () => {
        let newProducts = [];
        let result = await APIRequest("get", `ProductCategory?CategoryId=${id}`);

        newProducts = result.return.Products.map((product) => ({
            id: product.ProductId,
            title: product.Name,
            description: product.Description,
            image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
            rate: product.Rate,
            price: product.Price,
            quantity: product.Stock,
        }));

        setProducts(newProducts);
        console.log(result.return);
        setCategory(result.return);
    }

    useState(() => {
        fetchProducts();
    });

    var handleNextPage = () => {
        var newPage = 1;

        console.log(products.length, page * limit, products.length > page * limit);

        if (products.length > page * limit) {
            newPage = Number(page) + 1;
        }
        
        setsearchParam({ page: newPage });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    var handlePreviousPage = () => {
        var newPage = 1;

        if (page > 1) {
            newPage = Number(page) - 1;
        }
        
        setsearchParam({ page: newPage });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    var handleStartPage = () => {
        setsearchParam({ page: 1 });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    var handleEndPage = () => {
        setsearchParam({ page: Math.floor(products.length / limit) });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div>
            <Header />
            <div className="categoryproductsection">
                <h1 className="title">{category?.Name}</h1>
                <h4 className="subtitle">{category?.Description}</h4>

                

                <div className="main">
                    <div className="filter">
                        <div className="card">
                            
                        </div>
                    </div>

                    <div className="products">
                        {products.length > 0 ? (
                            products
                                .slice((page - 1) * limit, (page) * limit)
                                .map((product) => (
                                <div key={product.id} className="product" onClick={() => window.location.href = `/product/${product.id}`}>
                                    <img src={product.image} alt={product.title} />
                                    <p className="title">{product.title}</p>
                                    {/* <Rate rate={product.rate} /> */}
                                    <p className="price">{product.price}€</p>
                                    { product.quantity <= 0 ? <p style={{color: "red"}}>Rupture de stock</p> : <></> }
                                </div>
                            ))
                        ) : (
                            <p>Aucun article trouvé</p>
                        )}
                    </div>
                </div>

                {products.length > 0 && products.length > limit ? (

                    <div className="pagination">
                        <button onClick={() => handleStartPage()}><MdFirstPage/></button>
                        {page > 1 && <button onClick={() => handlePreviousPage()}><MdChevronLeft/></button>}
                        <p>Page {page}</p>
                        {products.length > page * limit && <button onClick={() => handleNextPage()}><MdChevronRight/></button>}
                        <button onClick={() => handleEndPage()}><MdLastPage/></button>
                    </div>
                ) : (
                    <></>
                )}

            </div>
            <Footer />
        </div>
    );
}

export default CategoryProductPage;