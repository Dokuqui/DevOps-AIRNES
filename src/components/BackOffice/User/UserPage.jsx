import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Static/Header';
import Footer from '../../Static/Footer';
import { regularUser } from '../../User_Flow/Login';
import '../../../styles/user.scss';
import { getUserInfo } from '../../../helper';
import LoadingScreen from '../../LoadingScreen';

const commandHistory = [
  {
    id: 1,
    product: 'Product 1',
    price: '$49.99',
    date: '2024-03-15',
    status: 'Delivered',
    description: 'lorum ipsum noga',
  },
  {
    id: 2,
    product: 'Product 2',
    price: '$39.99',
    date: '2024-01-15',
    status: 'In Progress',
    description: 'lorum ipsum noga',
  },
  {
    id: 3,
    product: 'Product 3',
    price: '$89.99',
    date: '2024-03-20',
    status: 'Denied',
    description: 'lorum ipsum noga',
  },
];

const UserPage = () => {
  const [userData, setUserData] = useState(regularUser);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState({
    field: '',
    value: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      await setUserData(await getUserInfo());
      setIsLoading(false);
    };
    fetchData();
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'green';
      case 'In Progress':
        return 'orange';
      case 'Denied':
        return 'red';
      default:
        return 'black';
    }
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
          </div>
          <div className="history" style={{ flex: 2 }}>
            <h3>Command History</h3>
            <ul>
              {commandHistory.map((command) => (
                <li key={command.id}>
                  <strong style={{ color: getStatusColor(command.status) }}>{command.status}</strong>{' '}
                  - {command.date} - {command.product} - {command.price} - Details:{' '}
                  {command.description}
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
