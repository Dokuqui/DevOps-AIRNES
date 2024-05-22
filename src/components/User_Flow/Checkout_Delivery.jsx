import React, { useEffect, useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";
import { APIRequest } from "../../helper"; // Adjust the import according to your project's structure

const Checkout_Delivery = () => {
  const [products, setProducts] = useState([
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

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [addressFields, setAddressFields] = useState({
    firstname: '',
    lastname: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: ''
  });
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      try {
        const result = await APIRequest("get", "Address"); // Adjust the endpoint as necessary
        setSavedAddresses(result.return.map((address) => ({
          id: address.AddressId,
          firstname: address.Firstname,
          lastname: address.Lastname,
          address1: address.Address1,
          address2: address.Address2,
          city: address.City,
          zip: address.ZipCode,
          country: address.Country
        })));

      } catch (error) {
        console.error("Failed to fetch saved addresses:", error);
      }
    };

    fetchSavedAddresses();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSavedAddressSelect = (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);

    if (addressId) {
      const selectedAddress = savedAddresses.find(addr => addr.id === parseInt(addressId));
      if (selectedAddress) {
        setAddressFields({
          firstname: selectedAddress.firstname,
          lastname: selectedAddress.lastname,
          address1: selectedAddress.address1,
          address2: selectedAddress.address2,
          city: selectedAddress.city,
          zip: selectedAddress.zip,
          country: selectedAddress.country
        });
      }
    } else {
      setAddressFields({
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        country: ''
      });
    }
  };

  const handleSaveAddressChange = (e) => {
    setSaveAddress(e.target.checked);
  };

  return (
    <div>
      <Header />
      <div className="checkoutsection">
        <h1 className="title">Checkout</h1>

        <div className="checkout">
          <div className="info">
            <label htmlFor="saved_addresses">Select a saved address</label>
            <select id="saved_addresses" onChange={handleSavedAddressSelect} value={selectedAddressId}>
              <option value="">-- Select an address --</option>
              {savedAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.firstname} {address.lastname}, {address.address1}, {address.city}, {address.zip}, {address.country}
                </option>
              ))}
            </select>

            {selectedAddressId === '' && (
              <div className="checkbox-container">
                <label htmlFor="save_address">Save this address</label>
                <input
                  type="checkbox"
                  id="save_address"
                  checked={saveAddress}
                  onChange={handleSaveAddressChange}
                />
              </div>
            )}

            <label htmlFor="firstname_input">Firstname</label>
            <input
              className="input"
              type="text"
              id="firstname_input"
              name="firstname"
              placeholder="Firstname"
              value={addressFields.firstname}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="lastname_input">Lastname</label>
            <input
              className="input"
              type="text"
              id="lastname_input"
              name="lastname"
              placeholder="Lastname"
              value={addressFields.lastname}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="address1_input">Address</label>
            <input
              className="input"
              type="text"
              id="address1_input"
              name="address1"
              placeholder="Address"
              value={addressFields.address1}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="address2_input">Address 2</label>
            <input
              className="input"
              type="text"
              id="address2_input"
              name="address2"
              placeholder="Address 2"
              value={addressFields.address2}
              onChange={handleAddressChange}
            />

            <label htmlFor="city_input">City</label>
            <input
              className="input"
              type="text"
              id="city_input"
              name="city"
              placeholder="City"
              value={addressFields.city}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="zip_input">Zip</label>
            <input
              className="input"
              type="text"
              id="zip_input"
              name="zip"
              placeholder="Zip"
              value={addressFields.zip}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="country_input">Country</label>
            <input
              className="input"
              type="text"
              id="country_input"
              name="country"
              placeholder="Country"
              value={addressFields.country}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="checkout-total">
            <div className="price-section">
              <h2>Total</h2>
              <h2>
                <span className="price">
                  {products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)} €
                </span>
              </h2>
            </div>

            <button
              disabled={products.length === 0}
              className="checkout"
              onClick={() => window.location.href = "/checkout/payment"}
            >
              Continue to payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout_Delivery;
