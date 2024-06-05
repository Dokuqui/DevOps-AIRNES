  import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Static/Header';
import Footer from '../../Static/Footer';
import { regularUser } from '../../User_Flow/Login';
import '../../../styles/user.scss';
import { APIRequest, getUserInfo } from '../../../helper';
import LoadingScreen from '../../LoadingScreen';
import validator from 'validator';

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
  const [newUserData, setNewUserData] = useState(regularUser);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState({
    field: '',
    value: '',
  });

  
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserInfo();
      await setUserData(user);
      await setNewUserData(user);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(newUserData.Mail)) {
      alert('Email invalid');
      return;
    }

    const response = await APIRequest('put', `Users`, {
      Firstname: newUserData.FirstName,
      Lastname: newUserData.LastName,
      Mail: newUserData.Mail,
    });

    if (response.success) {
      alert('User info updated');

      setUserData(newUserData);
    }

    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setModalContent({
      ...modalContent,
      value: e.target.value,
    });
  };

  return (
    <div>
      <Header />
      <LoadingScreen isLoading={isLoading}>
        <h2>Welcome Back, {userData?.FirstName} {userData?.LastName}</h2>
        <div className="box_back" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="personal_info">
            <h3>Personal Information</h3>
            
            <p>Name: {userData?.FirstName}</p>
            <p>Last Name: {userData?.LastName}</p>
            <p>Email: {userData?.Mail}</p>
            {/* Button to open modal for updating personal info */}
            
            <div className='btn-group'>
              <div className='separator'></div>

              {/* <Link to="/orders" className="btn">
                Orders
              </Link> */}
              <button className='btn' onClick={() => window.location.href = '/orders'}>Orders</button>

              <button className='btn' onClick={() => window.location.href = '/addresses'}>Addresses</button>

              {/* separator */}
              <div className='separator'></div>
              <button className='btn' onClick={() => setShowModal(true)}>Update Info</button>
              
              {/* Button to navigate to change password page */}
              {/* <Link to="/my-cabinet/update-password" className="btn">
                Update Password
              </Link> */}
              <button className='btn' onClick={() => window.location.href = '/my-cabinet/update-password'}>Update Password</button>
              
              {/* <Link to="/logout" className="btn">
                Logout
              </Link> */}
              <button className='btn' onClick={() => window.location.href = '/logout'}>Logout</button>
            </div>
          </div>
          
          {/* Modal for updating personal info */}
          {showModal && (
            <div className="modal-backdrop" onClick={() => setShowModal(false)}>
              <div className="modal" style={{ zIndex: 999 }}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <form onSubmit={handleFormSubmit}>
                    {/* <h2>Update {modalContent.field}</h2> */}
                    {/* <label>
                      Select field to update:
                      <select
                        value={modalContent.field}
                        onChange={(e) => setModalContent({ ...modalContent, field: e.target.value })}
                      >
                        <option value="Firstname">Name</option>
                        <option value="Lastname">Last Name</option>
                        <option value="Mail">Email</option>
                      </select>
                    </label>
                    <label>
                      New {modalContent.field}:
                      <input type="text" value={modalContent.value} onChange={handleInputChange} />
                    </label> */}
                      <label htmlFor="name">Prénom:</label>
                      <input type="text" id="name" name="name" value={newUserData?.FirstName} onChange={(e) => setNewUserData({ ...newUserData, FirstName: e.target.value })} />

                      <label htmlFor="lastname">Nom:</label>
                      <input type="text" id="lastname" name="lastname" value={newUserData?.LastName} onChange={(e) => setNewUserData({ ...newUserData, LastName: e.target.value })} />

                      <label htmlFor="email">Email:</label>
                      <input type="email" id="email" name="email" value={newUserData?.Mail} onChange={(e) => setNewUserData({ ...userData, Mail: e.target.value })} />
                      
                      <input type="submit" value="Submit" />
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
