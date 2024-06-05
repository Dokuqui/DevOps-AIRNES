import React, { useEffect, useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";
import { loadStripe } from "@stripe/stripe-js";
import { APIRequest } from "../../helper";

const stripePromise = loadStripe("pk_test_51PGFLzBeMEfwR1Dpa38IhbXDUYkG7gw62u9JdcwnN3KUUYeCjyhlBVQtiLm5SbIKSwyMj36mJSujKJAjC4PMkbMO00qn5R5Eil");

const Checkout_Payment = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  const fetchOrders = async () => {
    let result = await APIRequest("get", "Orders/Current");
    setOrder(result.data);
    let products_result = await APIRequest("get", `ProductOrder?OrderId=${result.data.OrderId}`);
    console.log(products_result);
    let newProducts = products_result.return.map((product) => ({
      id: product.Product.ProductId,
      price: product.Product.Price,
      quantity: product.Quantity,
      name: product.Product.Name,
    }));
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call your backend to create the Checkout session
    const response = await APIRequest("post", "create-checkout-session");

    const sessionId = response.id;

    console.log(sessionId);

    // Redirect to the Stripe hosted checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="checkoutsection">
        <h1 className="title">Checkout</h1>
        <div className="checkout">
          <div className="info">
            {/* Redirecting to Stripe for payment */}
            <p>You will be redirected to a secure Stripe page to complete your payment.</p>
          </div>
          <div className="checkout-total">
            <div className="price-section">
              <h2>Total</h2>
              <h2>
                <span className="price">{products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)} €</span>
              </h2>
            </div>
            <button disabled={products.length === 0} className="checkout" onClick={handleCheckout}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout_Payment;
