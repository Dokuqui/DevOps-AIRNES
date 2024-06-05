import React, { useState } from "react";

const AddUserModal = ({ addUser, roles, onClose }) => {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Mail: "",
    Password: "",
    RoleId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  const handleSubmit = () => {
    addUser(formData);
  };

  return (
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h3>Add User</h3>
      <label htmlFor="name">First Name:</label>
      <input
        type="text"
        id="name"
        name="Firstname"
        value={formData.firstname}
        onChange={handleChange}
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="Lastname"
        value={formData.lastname}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="Mail"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="role">Role:</label>
      {/* <input
        type="text"
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
      /> */}
      <select
        id="role"
        name="RoleId"
        value={formData.role}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      >
        {roles.map((role) => (
          <option key={role.RoleId} value={role.RoleId}>
            {role.Label}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddUserModal;
