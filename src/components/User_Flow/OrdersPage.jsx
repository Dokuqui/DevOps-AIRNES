import Footer from "../Static/Footer";
import Header from "../Static/Header";
import "../../styles/orders.scss";
import { useEffect, useState } from "react";
import { APIRequest, getUserInfo } from "../../helper";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [years, setYears] = useState([2024]);

    const fetchOrders = async () => {
        const userInfo = await getUserInfo();
        const response = await APIRequest("GET", "Orders");

        if (response.success) {
            await response.data.filter((order) => order.UserId === userInfo.UserId).forEach(async (order) => {
                let products = await APIRequest('get', `ProductOrder?OrderId=${order.OrderId}`);

                let price = products.return.reduce((acc, product) => acc + (product.Product.Price * product.Quantity), 0);

                setOrders((prevOrders) => [...prevOrders, {
                    ...order,
                    Total: price.toFixed(2),
                    Articles: products.return.reduce((acc, product) => acc + product.Quantity, 0),
                }]);

                if (!years.includes(new Date(order.OrderDate).getFullYear())) {
                    setYears((prevYears) => [...prevYears, new Date(order.OrderDate).getFullYear()]);
                }
            });
            

            // const years = response.data.map((order) => new Date(order.OrderDate).getFullYear());
            // const uniqueYears = [...new Set(years)];
            // setYears(uniqueYears);
        }
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
        fetchOrders();
    }, []);

    return (
        <>
            <Header />
            <div className="orders-page">
                <h1 className="title">Orders</h1>

                <div className="orders-list">
                    {/* {orders.map((order) => (
                        <div key={order.OrderId} className="order">
                            <h2>ordere n°{order.OrderId}</h2>
                            <p>Date de ordere: {order.OrderDate}</p>
                            <p>Statut: {order.Status}</p>
                            <p>Total: {order.Total} €</p>
                        </div>
                    ))} */}

                    {/* For all order sort it by date and create a separator if year is different */}
                    {years.map((year) => (
                        <>
                            <div key={year} className="year-indicator"><h2>{year}</h2><div className="bar"></div> </div>

                            {orders
                                .filter((order) => new Date(order.OrderDate).getFullYear() === year)
                                .reverse()
                                .sort((a, b) => a.Statut - b.Statut)
                                .sort((a, b) => b.OrderId - a.OrderId)
                            .map((order) => (
                                <div key={order.OrderId} className="order" onClick={() => {
                                    window.location.href = order.Statut === 1 ? `/orders/${order.OrderId}` : `/cart`;
                                }}>
                                    <p>{new Date(order.OrderDate).toLocaleDateString('en-US')} - {order.OrderId}</p>
                                    <p style={{ color: STATUT_COLOR[order.Statut] }}>{STATUT_TEXT[order.Statut]}</p>
                                    <p>{order.Articles} articles</p>
                                    <p>{order.Total} €</p>
                                </div>
                            ))}
                        </>
                    ))}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrdersPage;