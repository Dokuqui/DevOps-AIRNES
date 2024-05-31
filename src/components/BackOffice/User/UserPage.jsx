import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Static/Header';
import Footer from '../../Static/Footer';
import { regularUser } from '../../User_Flow/Login';
import '../../../styles/user.scss';
import { APIRequest, getUserInfo } from '../../../helper';
import LoadingScreen from '../../LoadingScreen';

// const commandHistory = [
//   {
//     id: 1,
//     product: 'Product 1',
//     price: '$49.99',
//     date: '2024-03-15',
//     statut: 'Delivered',
//     description: 'lorum ipsum noga',
//   },
//   {
//     id: 2,
//     product: 'Product 2',
//     price: '$39.99',
//     date: '2024-01-15',
//     statut: 'In Progress',
//     description: 'lorum ipsum noga',
//   },
//   {
//     id: 3,
//     product: 'Product 3',
//     price: '$89.99',
//     date: '2024-03-20',
//     statut: 'Denied',
//     description: 'lorum ipsum noga',
//   },
// ];

const UserPage = () => {
  const [userData, setUserData] = useState(regularUser);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState({
    field: '',
    value: '',
  });
  const [commandHistory, setCommandHistory] = useState([]);

  const fetchOrders = async () => {
    let result = await APIRequest('get', 'Orders');

    console.log(result);

    let newCommandHistory = [];

    for (let i = 0; i < result.data.length; i++) {
      let order = result.data[i];
      let products = await APIRequest('get', `ProductOrder?OrderId=${order.OrderId}`);

      let price = products.return.reduce((acc, product) => acc + (product.Product.Price * product.Quantity), 0);

      newCommandHistory.push({
        id: order.OrderId,
        date: order.OrderDate,
        statut: order.Statut,
        price: price.toFixed(2),
        articles: products.return.reduce((acc, product) => acc + product.Quantity, 0),
      });
    }




    setCommandHistory(newCommandHistory.reverse());
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await setUserData(await getUserInfo());
      setIsLoading(false);
    };
    fetchData();
    fetchOrders();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setUserData((prevUserData) => ({
      ...prevUserData,
      [modalContent.field]: modalContent.value,
    }));

    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setModalContent({
      ...modalContent,
      value: e.target.value,
    });
  };

  const getstatutColor = (statut) => {
    switch (statut) {
      case 1:
        return 'green';
      case 0:
        return 'orange';
      default:
        return 'black';
    }
  };
  
  const STATUT_TEXT = {
    1: 'Delivered',
    0: 'In Progress',
  };

  return (
    <div>
      <Header />
      <LoadingScreen isLoading={isLoading}>
        <h2>Welcome Back, {userData?.FirstName} {userData?.LastName}</h2>
        <div className="box_back" style={{ display: 'flex' }}>
          <div className="personal_info" style={{ flex: 1 }}>
            <h3>Personal Information</h3>
            
            <p>Name: {userData?.FirstName}</p>
            <p>Last Name: {userData?.LastName}</p>
            <p>Email: {userData?.Mail}</p>
            {/* Button to open modal for updating personal info */}
            <div className="button-cont">
              <button onClick={() => setShowModal(true)}>Update Info</button>
            </div>
            {/* Button to navigate to change password page */}
            <Link to="/my-cabinet/update-password" className="button-link">
              Update Password
            </Link>
            
            <Link to="/logout" className="button-link" style={{ backgroundColor: 'red' }}>
              Logout
            </Link>
          </div>
          <div className="history" style={{ flex: 2 }}>
            <h3>Command History</h3>
            <ul>
              {commandHistory.map((command) => (
                <li key={command.id}>
                  {new Date(command.date).toLocaleDateString('fr-FR')} - <strong style={{ color: getstatutColor(command.statut) }}>{STATUT_TEXT[command.statut]} </strong>
                  - {command.price} - {command.articles} Products
                </li>
              ))}
            </ul>
          </div>
          {/* Modal for updating personal info */}
          {showModal && (
            <div className="modal-backdrop" onClick={() => setShowModal(false)}>
              <div className="modal" style={{ zIndex: 999 }}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <form onSubmit={handleFormSubmit}>
                    <h2>Update {modalContent.field}</h2>
                    <label>
                      Select field to update:
                      <select
                        value={modalContent.field}
                        onChange={(e) => setModalContent({ ...modalContent, field: e.target.value })}
                      >
                        <option value="name">Name</option>
                        <option value="lastname">Last Name</option>
                        <option value="email">Email</option>
                      </select>
                    </label>
                    <label>
                      New {modalContent.field}:
                      <input type="text" value={modalContent.value} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Update</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </LoadingScreen>
      <Footer />
    </div>
  );
};

export default UserPage;
