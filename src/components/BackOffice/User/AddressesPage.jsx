import React, { useEffect, useState } from "react";
import Header from "../../Static/Header";
import Footer from "../../Static/Footer";
import "../../../styles/checkout.scss";
import { APIRequest, API_URL, wait } from "../../../helper"; // Adjust the import according to your project's structure
import LoadingScreen from "../../LoadingScreen";


const emptyAddressFields = {
  firstname: '',
  lastname: '',
  address1: '',
  address2: '',
  city: '',
  zip: '',
  country: '',
  region: '',
  phone: '' // Added phone number field
}

const AddressesPage = () => {
  var [isLoading, setIsLoading] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [addressFields, setAddressFields] = useState(emptyAddressFields);
  const [saveAddress, setSaveAddress] = useState(false);

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
        phone: address.Phone, // Include phone number in the saved addresses
        temporary: address.Temporary
      })));

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch saved addresses:", error);
    }
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSavedAddressSelect = async (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);    

    if (addressId) {
      let selectedAddress = savedAddresses.find(addr => addr.id === parseInt(addressId));

      // Wait until saveddAddresses is populated

      if (selectedAddress && !selectedAddress.temporary) {
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

        return;
      }
    }

    setSelectedAddressId('');
  
    setAddressFields(emptyAddressFields);
  };

  const handleSaveAddress = async () => {
    try {
      if (selectedAddressId) {
        await APIRequest("put", `Address/${selectedAddressId}`, {
          Firstname: addressFields.firstname,
          Lastname: addressFields.lastname,
          Address1: addressFields.address1,
          Address2: addressFields.address2,
          City: addressFields.city,
          ZipCode: addressFields.zip,
          Country: addressFields.country,
          Region: addressFields.region, // Include region in the saved addresses
          Phone: addressFields.phone // Include phone number in the saved addresses
        });
      } else {
        await APIRequest("post", "Address", {
          Firstname: addressFields.firstname,
          Lastname: addressFields.lastname,
          Address1: addressFields.address1,
          Address2: addressFields.address2,
          City: addressFields.city,
          ZipCode: addressFields.zip,
          Country: addressFields.country,
          Region: addressFields.region, // Include region in the saved addresses
          Phone: addressFields.phone // Include phone number in the saved addresses
        });
      }



      await fetchSavedAddresses();
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      if (selectedAddressId) {
        await APIRequest("delete", `Address/${selectedAddressId}`);
        await fetchSavedAddresses();
        setAddressFields(emptyAddressFields);
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  }


  return (
    <div>
      <Header />
      <LoadingScreen isLoading={isLoading}>
      <div className="checkoutsection">
        <h1 className="title">Addresses</h1>

        <div className="checkout">
          <div className="info">
            <label htmlFor="saved_addresses">Select a saved address</label>
            <select id="saved_addresses" onChange={handleSavedAddressSelect} value={selectedAddressId} style={{ marginBottom: "10px" }}>
              <option value="">-- Select an address --</option>
              {savedAddresses.filter(address => !address.temporary).map(address => (
                <option key={address.id} value={address.id}>
                  {address.firstname} {address.lastname}, {address.address1}, {address.city}, {address.zip}, {address.country}
                </option>
              ))}
            </select>

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
            />
          </div>

          <div className="checkout-total">

          <button
              className="btn"
              onClick={handleSaveAddress}
            >
              Save Address
            </button>

            <button
              className="btn"
              onClick={handleDeleteAddress}
              disabled={!selectedAddressId}
            >
              Delete Address
            </button>
          </div>
        </div>
      </div>
      </LoadingScreen>
      <Footer />
    </div>
  );
};

export default AddressesPage;
