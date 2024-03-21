import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Static/Header';
import Footer from '../../Static/Footer';
import { regularUser } from '../../User_Flow/Login';
import '../../../styles/user.scss';

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
  const [image, setImage] = useState(null);
  const [modalContent, setModalContent] = useState({
    field: '',
    value: '',
  });

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 190;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height *= maxDimension / width;
            width = maxDimension;
          } else {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const resizedImage = canvas.toDataURL('image/jpeg');

        setImage(resizedImage);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Header />
      <h2>Welcome Back, {regularUser.name}</h2>
      <div className="box_back" style={{ display: 'flex' }}>
        <div className="personal_info" style={{ flex: 1 }}>
          <h3>Personal Information</h3>
          <div className="profile-image">
            {image ? (
              <img src={image} alt="Profile" />
            ) : (
              <label htmlFor="profile-upload" className="upload-label">
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                Upload Photo
              </label>
            )}
          </div>
          <p>Name: {regularUser.name}</p>
          <p>Last Name: {regularUser.lastname}</p>
          <p>Email: {regularUser.email}</p>
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
      <Footer />
    </div>
  );
};

export default UserPage;
