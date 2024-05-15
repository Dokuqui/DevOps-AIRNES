import React, { useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";

import {CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const Checkout_Payment = () => {
  var [products, setProducts] = useState([
      {
          id: 1,
          image: "https://img.vntg.com/large/15189795055032/vintage-lounge-chair-1960s.jpg",
          name: "INY VINTAGE CHAIR",
          price: Math.floor(Math.random() * 100),
          quantity: Math.floor(Math.random() * 10),
          isFavorite: Math.random() > 0.5
      },
      {
          id: 2,
          image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
          name: "LARGE TERRACOTA VASE",
          price: Math.floor(Math.random() * 100),
          quantity: Math.floor(Math.random() * 10),
          isFavorite: Math.random() > 0.5
      }
  ]);

  const stripePromise = loadStripe('pk_test_51PGFLzBeMEfwR1Dpa38IhbXDUYkG7gw62u9JdcwnN3KUUYeCjyhlBVQtiLm5SbIKSwyMj36mJSujKJAjC4PMkbMO00qn5R5Eil');
  
  return (
    <div>
      <Header />
      <div className="checkoutsection">
        <h1 className="title">Checkout</h1>

        <div className="checkout">
            <div className="info">
              <Elements stripe={stripePromise}>
                <label htmlFor="cardnumber_input">Card Number</label>
                <CardNumberElement id="cardnumber_input" className="input" options={{
                  showIcon: true,
                }}/>
                <label htmlFor="cardexpiry_input">Card Expiry</label>
                <CardExpiryElement id="cardexpiry_input" className="input" options={{
                  showIcon: true,
                }}/>
                <label htmlFor="cardcvc_input">Card CVC</label>
                <CardCvcElement id="cardcvc_input" className="input" options={{
                  showIcon: true,
                }}/>

                <label htmlFor="cardname_input">Card Name</label>
                <input className="input" type="text" id="cardname_input" name="cardname" placeholder="Card Name" required />
              </Elements>
            </div>

            <div className="checkout-total">
                <div className="price-section">
                    <h2>Total</h2>
                    <h2><span className="price">{(products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2))} €</span></h2>
                </div>
                
                <button disabled={products.length === 0} className="checkout" onClick={() => window.location.href = "/order-completed"}>Submit</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout_Payment;
