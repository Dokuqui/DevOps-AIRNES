import React, { useState } from "react";

const AddUserModal = ({ addUser, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    lastname: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addUser(formData);
    onClose();
  };

  return (
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h3>Add User</h3>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="role">Role:</label>
      <input
        type="text"
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddUserModal;
