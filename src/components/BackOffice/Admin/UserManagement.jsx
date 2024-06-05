import React, { useEffect, useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import AddUserModal from "./Model/AddModal";
import UpdateUserModal from "./Model/UpdateModal";
import DeleteUserModal from "./Model/DeleteModal";
import "../../../styles/modal_admin.scss";
import "../../../styles/admin.scss";
import { APIRequest } from "../../../helper";
import validator from "validator";

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
  const [roles, setRoles] = useState([]);
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

  const addUser = async (user) => {
    // const newUser = { ...user, id: getNextId() };
    // setUsers([...users, newUser]);

    if (!validator.isEmail(user.Mail)) {
      alert("Invalid email");
      return;
    }
    
    if (!validator.isStrongPassword(user.Password)) {
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character");
      return;
    }

    await APIRequest("POST", "Users", user);
    await fetchUsers();
    setShowAddModal(false)
  };

  const updateUser = async (updatedUser) => {
    await APIRequest("PUT", "Users", updatedUser);
    fetchUsers();
  };

  const deleteUser = async () => {
    await APIRequest("DELETE", `Users/${selectedUser.UserId}`);
    await fetchUsers();
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  const fetchUsers = async () => {
    const response = await APIRequest("GET", "Users");

    if (response.success) {
      console.log(response.return);
      setUsers(response.return);
    }
  }

  const fetchRoles = async () => {
    const response = await APIRequest("GET", "Roles");

    if (response.success) {
      setRoles(response.return);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

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
              <tr key={user.UserId}>
                <td>{user.UserId}</td>
                <td>{user.Firstname}</td>
                <td>{user.Lastname}</td>
                <td>{user.Mail}</td>
                <td>{user.RoleId}</td>
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
            roles={roles}
            onClose={() => setShowAddModal(false)}
          />
        </div>
      )}

      {/* Update User Modal */}
      {showUpdateModal && (
        <div className="modal">
          <UpdateUserModal
            user={selectedUser}
            roles={roles}
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
