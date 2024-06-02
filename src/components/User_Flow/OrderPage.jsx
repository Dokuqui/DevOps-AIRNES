import Footer from "../Static/Footer";
import Header from "../Static/Header";
import "../../styles/order.scss";
import { useEffect, useState } from "react";
import { APIRequest, API_URL, getUserInfo } from "../../helper";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const OrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    var [products, setProducts] = useState([]);
    var [address, setAddress] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const fetchOrder = async () => {
        const order_result = await APIRequest("GET", "Orders?OrderId=" + id);

        if (order_result.success && order_result.data.length > 0 && order_result.data[0].Statut != 0) {
            let products_result = await APIRequest("get", `ProductOrder?OrderId=${order_result.data[0].OrderId}`);
            console.log(products_result);


            let newProducts = products_result.return.map((product) => ({
                id: product.Product.ProductId,
                name: product.Product.Name,
                image: product.Product.Pictures?.[0]?.Link ? `${API_URL}/${product.Product.Pictures[0].Link}` : "/image/placeholder.webp",
                price: product.Product.Price,
                quantity: product.Quantity,
                material: product.MaterialId,
            }));

            setProducts(newProducts);

            setOrder({
                ...order_result.data[0],
                Total: newProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0),
            });

            let address_result = await APIRequest("GET", "Address?AddressId=" + order_result.data[0].AddressId);

            setAddress(address_result.return[0]);

            setIsLoading(false);
            return;
        }

        window.location.href = "/404";
    }

    const STATUT_TEXT = {
        1: 'Delivered',
        0: 'In Progress',
    };

    const STATUT_COLOR = {
        1: 'green',
        0: 'orange',
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            <Header />
            <LoadingScreen isLoading={isLoading}>
                <div className="order-page">
                    <h1>Commande #{order.OrderId} - {new Date(order.OrderDate).toLocaleDateString()} - {STATUT_TEXT[order.Statut]}</h1>

                    <div className="order">

                        <div className="products">
                            {products.map((product, i) => (
                                <div className="product" key={i}>
                                    <img className="product-image" src={product.image} alt={product.name} />

                                    <div className="product-body">
                                        <div className="info">
                                            <div className="product-header">
                                                <p className="product-name" onClick={() => window.location.href = `/product/${product.id}`}>{product.name}</p>
                                            </div>
                                            <p className="price">{product.price}€</p>
                                        </div>


                                        <div className="action">

                                            <input type="number" value={product.quantity} disabled />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="info">
                            <div className="price">
                                <p className="bold">Total</p>
                                <p className="bold">{order.Total} €</p>
                            </div>
                            <div className="separator"></div>
                            <h2 className="bold">Adresse de livraison</h2>
                            <p>{address.Firstname} {address.Lastname}</p>
                            <p>{address.Address1}</p>
                            { address.Address2 && <p>{address.Address2}</p> }
                            <p>{address.ZipCode} {address.City}</p>
                            <p>{address.Country}</p>
                            <p>{address.Phone}</p>

                        </div>
                    </div>
                    
                </div>
            </LoadingScreen>
            <Footer />
        </>
    )
}

export default OrderPage;