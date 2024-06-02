import Footer from "../Static/Footer";
import Header from "../Static/Header";
import '../../styles/cart.scss';
import { BsHeart, BsHeartFill, BsTrash3, BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { APIRequest, API_URL } from "../../helper";
import axios from "axios";
import LoadingScreen from "../LoadingScreen";

const CartPage = () => {
    var [products, setProducts] = useState([]);
    var [order, setOrder] = useState([]);
    var [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        let result = await APIRequest("get", "Orders/Current");

        setOrder(result.data);

        let products_result = await APIRequest("get", `ProductOrder?OrderId=${result.data.OrderId}`);
        console.log(products_result);


        let newProducts = products_result.return.map((product) => ({
            id: product.Product.ProductId,
            name: product.Product.Name,
            image: product.Product.Pictures?.[0]?.Link ? `${API_URL}/${product.Product.Pictures[0].Link}` : "/image/placeholder.webp",
            price: product.Product.Price,
            quantity: product.Quantity,
            material: product.MaterialId,
            isFavorite: false
        }));

        setProducts(newProducts);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    const handleFavoriteClick = (item) => {
        const updatedFavorites = products.map(product =>
            product.id === item.id ? { ...product, isFavorite: !product.isFavorite } : product
        );
        setProducts(updatedFavorites);
        // Add to favorite callback ...
    }

    const handleDeleteClick = async (item) => {
        await APIRequest("delete", `ProductOrder?OrderId=${order.OrderId}&ProductId=${item.id}&MaterialId=${item.material}`);
        fetchOrders();
    }

    const handleQuantityChange = (item, quantity) => {
        const updatedProducts = products.map(product =>
            product.id === item.id ? { ...product, quantity: quantity } : product
        );
        setProducts(updatedProducts);
    }

    const handleQuantityUnfocus = async (item) => {
        if (item.quantity < 1) 
            return handleDeleteClick(item);
        
        await APIRequest("put", `ProductOrder`, {
            ProductId: item.id,
            Quantity: item.quantity,
            MaterialId: item.material
        });

        fetchOrders();
    }

    return (
        <div>
            <Header />
            <LoadingScreen isLoading={isLoading}>
                <div className="cartsection">
                    <h1 className="title">Panier</h1>

                    <div className="cart">
                        <div className="products">
                            { products.map((product, i) => (
                                <div className="product" key={i}>
                                    <img className="product-image" src={product.image} alt={product.name} />

                                    <div className="product-body">
                                        <div className="info">
                                            <div className="product-header">
                                                <p className="product-name" onClick={() => window.location.href = `/product/${product.id}`}>{product.name}</p>
                                                <button className="product-delete" onClick={() => handleDeleteClick(product)}><BsTrash3Fill/></button>
                                            </div>
                                            <p className="price">{product.price}€</p>
                                        </div>
                                        

                                        <div className="action">
                                            <button className="favorite" onClick={() => handleFavoriteClick(product)}>{product.isFavorite ? <BsHeartFill color="red" /> : <BsHeart />}</button>

                                            <input type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product, e.target.value)} onBlur={(e) => handleQuantityUnfocus(product)} />
                                        </div>
                                    </div>
                                </div>
                            )) }
                        </div>

                        <div className="cart-total">
                            <div className="price-section">
                                <h2>Total</h2>
                                <h2><span className="price">{(products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2))} €</span></h2>
                            </div>
                            
                            <button disabled={products.length === 0} className="checkout" onClick={() => window.location.href = "/checkout"}>Passer commande</button>
                        </div>
                    </div>
                </div>
            </LoadingScreen>
            <Footer />
        </div>
    );
};

export default CartPage;