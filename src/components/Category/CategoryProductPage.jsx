import { useParams } from "react-router";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/categoryproduct.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdFirstPage, MdLastPage, MdChevronRight, MdChevronLeft } from "react-icons/md";
import Rate from "../Home/Rate";

const CategoryProductPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    
    const [searchParam, setsearchParam] = useSearchParams();

    const page = searchParam.get("page") > 0 ? searchParam.get("page") : 1;
    const limit = 25;

    useEffect(() => {
        var newProducts = [];
        for (let i = 0; i < 250; i++) {

            newProducts.push({
                id: i,
                title: `Product ${i}`,
                image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                rate: Math.floor(Math.random() * 6),
                price: Math.floor(Math.random() * 30),
                isFavorite: Math.round(Math.random() * 0.9)
            });
        }
        
        setProducts(newProducts);
    }, []);

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
                <h1 className="title">{id}</h1>

                <div className="main">
                    <div className="filter">
                        <div className="card">
                            
                        </div>
                    </div>

                    <div className="products">
                        {products
                            .slice((page - 1) * limit, (page) * limit)
                            .map((product) => (
                            <div key={product.id} className="product" onClick={() => window.location.href = `/product/${product.id}`}>
                                <img src={product.image} alt={product.title} />
                                <p className="title">{product.title}</p>
                                <Rate rate={product.rate} />
                                <p className="price">{product.price}€</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pagination">
                    <button onClick={() => handleStartPage()}><MdFirstPage/></button>
                    {page > 1 && <button onClick={() => handlePreviousPage()}><MdChevronLeft/></button>}
                    <p>Page {page}</p>
                    {products.length > page * limit && <button onClick={() => handleNextPage()}><MdChevronRight/></button>}
                    <button onClick={() => handleEndPage()}><MdLastPage/></button>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default CategoryProductPage;