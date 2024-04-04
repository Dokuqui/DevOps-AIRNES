import React, { useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import AddUserModal from "./Model/AddModal";
import UpdateUserModal from "./Model/UpdateModal";
import DeleteUserModal from "./Model/DeleteModal";
import "../../../styles/modal_admin.scss";
import "../../../styles/admin.scss";

export const initialUser = [
  {
    id: 1,
    name: "John",
    lastname: "Doe",
    email: "john.doe@test.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane",
    lastname: "Smith",
    email: "jane.smith@test.com",
    role: "User",
  },
  {
    id: 3,
    name: "Bob",
    lastname: "Johnson",
    email: "bob.johnson@test.com",
    role: "User",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getNextId = () => {
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const addUser = (user) => {
    const newUser = { ...user, id: getNextId() };
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <Sidebar />
      <div className="user-content">
        <h2>User Management</h2>
        <button className="add-btn" onClick={handleAddUser}>Add User</button>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateUser(user)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal">
          <AddUserModal
            addUser={addUser}
            onClose={() => setShowAddModal(false)}
          />
        </div>
      )}

      {/* Update User Modal */}
      {showUpdateModal && (
        <div className="modal">
          <UpdateUserModal
            user={selectedUser}
            updateUser={updateUser}
            onClose={() => setShowUpdateModal(false)}
          />
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="modal">
          <DeleteUserModal
            user={selectedUser}
            deleteUser={deleteUser}
            onClose={() => setShowDeleteModal(false)}
          />
        </div>
      )}
      <FooterBack />
    </div>
  );
};

export default UserManagement;
