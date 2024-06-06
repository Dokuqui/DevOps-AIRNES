import React from "react";

const DeleteUserModal = ({ user, deleteUser, onClose }) => {
  const handleDelete = () => {
    deleteUser(user.UserId);
  };

  return (
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h3>Delete User</h3>
      <p>Are you sure you want to delete user {user.Firstname} {user.Lastname}?</p>
      <button onClick={handleDelete}>Confirm</button>
    </div>
  );
};

export default DeleteUserModal;
