import React, { useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";


const Checkout_Delivery = () => {
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

  return (
    <div>
      <Header />
      <div className="checkoutsection">
        <h1 className="title">Checkout</h1>

        <div className="checkout">
            <div className="info">
              <label htmlFor="firstname_input">Firstname</label>
              <input className="input" type="text" id="firstname_input" name="firstname" placeholder="Firstname" required />

              <label htmlFor="lastname_input">Lastname</label>
              <input className="input" type="text" id="lastname_input" name="lastname" placeholder="Lastname" required />

              <label htmlFor="address1_input">Address</label>
              <input className="input" type="text" id="address1_input" name="address" placeholder="Address" required />

              <label htmlFor="address2_input">Address 2</label>
              <input className="input" type="text" id="address2_input" name="address2" placeholder="Address 2" />

              <label htmlFor="city_input">City</label>
              <input className="input" type="text" id="city_input" name="city" placeholder="City" required />

              <label htmlFor="zip_input">Zip</label>
              <input className="input" type="text" id="zip_input" name="zip" placeholder="Zip" required />

              <label htmlFor="country_input">Country</label>
              <input className="input" type="text" id="country_input" name="country" placeholder="Country" required />
            </div>

            <div className="checkout-total">
                <div className="price-section">
                    <h2>Total</h2>
                    <h2><span className="price">{(products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2))} €</span></h2>
                </div>
                
                <button disabled={products.length === 0} className="checkout" onClick={() => window.location.href = "/checkout/payment"}>Continue to payment</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout_Delivery;
