import React, { useEffect, useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import { APIRequest } from "../../../helper";

const RoomManager = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roomForm, setRoomForm] = useState({ Name: "" });

    const handleAddRoom = () => {
        setRoomForm({ Name: "" });
        setShowAddModal(true);
    };

    const handleUpdateRoom = (room) => {
        setSelectedRoom(room);
        setRoomForm({ Name: room.Name });
        setShowUpdateModal(true);
    };

    const handleDeleteRoom = (room) => {
        setSelectedRoom(room);
        setShowDeleteModal(true);
    };

    const addRoom = async (room) => {
        const response = await APIRequest("POST", "Rooms", room);
        if (response.success) {
            fetchRooms();
            setShowAddModal(false);
        } else {
            console.error("Failed to add room");
        }
    };

    const updateRoom = async (updatedRoom) => {
        const response = await APIRequest("PUT", `Rooms`, updatedRoom);
        if (response.success) {
            fetchRooms();
            setShowUpdateModal(false);
        } else {
            console.error("Failed to update room");
        }
    };

    const deleteRoom = async () => {
        const response = await APIRequest("DELETE", `Rooms/${selectedRoom.RoomId}`);
        if (response.success) {
            fetchRooms();
            setSelectedRoom(null);
            setShowDeleteModal(false);
        } else {
            console.error("Failed to delete room");
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setRoomForm({ ...roomForm, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (showAddModal) {
            addRoom(roomForm);
        } else if (showUpdateModal) {
            updateRoom({ ...selectedRoom, ...roomForm });
        }
    };

    const fetchRooms = async () => {
        const response = await APIRequest("GET", "Rooms");
        setRooms(response.return);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <Sidebar />
            <div className="admin-content">
                <h2>Room Management</h2>
                <button className="add-btn" onClick={handleAddRoom}>Add Room</button>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.RoomId}>
                                <td>{room.RoomId}</td>
                                <td>{room.Name}</td>
                                <td>
                                    <button
                                        className="update-btn"
                                        onClick={() => handleUpdateRoom(room)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteRoom(room)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Update Room Modal */}
            {(showAddModal || showUpdateModal) && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{showAddModal ? "Add Room" : "Update Room"}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                value={roomForm.Name}
                                onChange={handleFormChange}
                                required
                            />
                            <button type="submit" className="save-btn">Save</button>
                            <button type="button" className="cancel-btn" onClick={() => (showAddModal ? setShowAddModal(false) : setShowUpdateModal(false))}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Room Modal */}
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete the room "{selectedRoom.Name}"?</p>
                        <button className="delete-btn" onClick={deleteRoom}>Delete</button>
                        <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <FooterBack />
        </div>
    );
};

export default RoomManager;