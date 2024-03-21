import React from "react";

const DeleteUserModal = ({ user, deleteUser, onClose }) => {
  const handleDelete = () => {
    deleteUser(user.id);
    onClose();
  };

  return (
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h3>Delete User</h3>
      <p>Are you sure you want to delete user {user.name}?</p>
      <button onClick={handleDelete}>Confirm</button>
    </div>
  );
};

export default DeleteUserModal;
