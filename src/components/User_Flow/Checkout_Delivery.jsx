import React, { useEffect, useState } from "react";
import Header from "../Static/Header";
import Footer from "../Static/Footer";
import "../../styles/checkout.scss";
import { APIRequest, API_URL } from "../../helper"; // Adjust the import according to your project's structure
import LoadingScreen from "../LoadingScreen";

const Checkout_Delivery = () => {
  var [isLoading, setIsLoading] = useState(true);
  var [products, setProducts] = useState([]);
  var [order, setOrder] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [addressFields, setAddressFields] = useState({
    firstname: '',
    lastname: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    region: '',
    phone: '' // Added phone number field
  });
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      let result = await APIRequest("get", "Orders/Current");

      await setOrder(result.data);

      let products_result = await APIRequest("get", `ProductOrder?OrderId=${result.data.OrderId}`);
      console.log(products_result);

      let newProducts = products_result.return.map((product) => ({
          id: product.Product.ProductId,
          price: product.Product.Price,
          quantity: product.Quantity,
      }));

      setProducts(newProducts);
      
      if (result.data.AddressId) {
        console.log("AddressId", result.data.AddressId);
        handleSavedAddressSelect({ target: { value: result.data.AddressId } });
      };

      setIsLoading(false);
    };

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
          country: address.Country,
          region: address.Region, // Include region in the saved addresses
          phone: address.Phone // Include phone number in the saved addresses
        })));

        
  
      } catch (error) {
        console.error("Failed to fetch saved addresses:", error);
      }
    };

    fetchOrders();
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
          country: selectedAddress.country,
          region: selectedAddress.region, // Set the region field when address is selected
          phone: selectedAddress.phone // Set the phone number field when address is selected
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
        country: '',
        region: '', // Reset the region field when no address is selected
        phone: '' // Reset the phone number field when no address is selected
      });
    }
  };

  const handleContinueToPayment = async () => {
    try {
      let addressId = selectedAddressId;
      if (!addressId) {
        const result = await APIRequest("post", "Address", {
          Firstname: addressFields.firstname,
          Lastname: addressFields.lastname,
          Address1: addressFields.address1,
          Address2: addressFields.address2,
          City: addressFields.city,
          ZipCode: addressFields.zip,
          Country: addressFields.country,
          Region: addressFields.region, // Include region in the request payload
          Phone: addressFields.phone // Include phone number in the request payload
        });

        addressId = result.return.AddressId;
      }

      await APIRequest("post", "Orders/SetAddress", {
        OrderId: order.OrderId,
        AddressId: addressId
      });


      window.location.href = "/checkout/payment";
    } catch (error) {
      console.error("Failed to continue to payment:", error);
    }
  };

  const handleSaveAddressChange = (e) => {
    setSaveAddress(e.target.checked);
  };

  return (
    <div>
      <Header />
      <LoadingScreen isLoading={isLoading}>
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
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              disabled={!!selectedAddressId} // Disable input if address is selected
            />

            <label htmlFor="region_input">Region</label>
            <input
              className="input"
              type="text"
              id="region_input"
              name="region"
              placeholder="Region"
              value={addressFields.region}
              onChange={handleAddressChange}
              required
              disabled={!!selectedAddressId} // Disable input if address is selected
            />

            <label htmlFor="phone_input">Phone</label> {/* Added phone input */}
            <input
              className="input"
              type="text"
              id="phone_input"
              name="phone"
              placeholder="Phone"
              value={addressFields.phone}
              onChange={handleAddressChange}
              required
              disabled={!!selectedAddressId} // Disable input if address is selected
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
              onClick={handleContinueToPayment}
            >
              Continue to payment
            </button>
          </div>
        </div>
      </div>
      </LoadingScreen>
      <Footer />
    </div>
  );
};

export default Checkout_Delivery;
