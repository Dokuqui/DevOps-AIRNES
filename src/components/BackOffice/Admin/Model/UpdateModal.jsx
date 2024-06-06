import React, { useState } from "react";

const UpdateUserModal = ({ user, updateUser, roles, onClose }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    updateUser({ ...user, ...formData });
    onClose();
  };

  return (
    <form className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h3>Update User</h3>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="firstname"
        name="Firstname"
        value={formData.Firstname}
        onChange={handleChange}
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="Lastname"
        value={formData.Lastname}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="Mail"
        value={formData.Mail}
        onChange={handleChange}
      />
      <label htmlFor="role">Role:</label>
      {/* <input
        type="text"
        id="role"
        name="RoleId"
        value={formData.RoleId}
        onChange={handleChange}
      /> */}
      <select
        name="RoleId"
        value={formData.RoleId}
        onChange={handleChange}
        style={{ marginBottom: "10px" }}
      >
        {roles.map((role) => (
          <option key={role.RoleId} value={role.RoleId}>
            {role.Label}
          </option>
        ))}
      </select>

      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default UpdateUserModal;
