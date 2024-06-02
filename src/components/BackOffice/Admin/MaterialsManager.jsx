import React, { useEffect, useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import "../../../styles/modal_admin.scss";
import "../../../styles/admin.scss";
import { APIRequest, API_URL } from "../../../helper";
import axios from "axios";

const MaterialsManager = () => {
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [materialForm, setMaterialForm] = useState({ MaterialId: "", Label: "" });

    const getNextId = () => {
        const maxId = Math.max(...materials.map((material) => material.MaterialId));
        return maxId + 1;
    };

    const handleAddMaterial = () => {
        setMaterialForm({ MaterialId: "", Label: "" });
        setShowAddModal(true);
    };

    const handleUpdateMaterial = (material) => {
        setSelectedMaterial(material);
        setMaterialForm({ MaterialId: material.MaterialId, Label: material.Label });
        setShowUpdateModal(true);
    };

    const handleDeleteMaterial = (material) => {
        setSelectedMaterial(material);
        setShowDeleteModal(true);
    };

    const addMaterial = async (material) => {
        // const newMaterial = { ...material, MaterialId: getNextId() };
        // setMaterials([...materials, newMaterial]);

        const response = await APIRequest("post", "Materials", material);
        if (response.success) {
            fetchMaterials();
            setShowAddModal(false);
        } else {
            alert("Failed to add material");
        }

    };

    const updateMaterial = async (updatedMaterial) => {
        // const updatedMaterials = materials.map((material) =>
        //     material.MaterialId === updatedMaterial.MaterialId ? updatedMaterial : material
        // );
        // setMaterials(updatedMaterials);
        // setShowUpdateModal(false);

        const response = await APIRequest("put", `Materials`, updatedMaterial);
        if (response.success) {
            fetchMaterials();
            setShowUpdateModal(false);
        } else {
            alert("Failed to update material");
        }
    };

    const deleteMaterial = async () => {
        const response = await APIRequest("delete", `Materials/${selectedMaterial.MaterialId}`);
        if (response.success) {
            fetchMaterials();
            setSelectedMaterial(null);
            setShowDeleteModal(false);
        } else {
            alert("Failed to delete material");
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setMaterialForm({ ...materialForm, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (showAddModal) {
            addMaterial(materialForm);
        } else if (showUpdateModal) {
            updateMaterial({ ...selectedMaterial, ...materialForm });
        }
    };

    const fetchMaterials = async () => {
        const response = await APIRequest("get", "Materials");
        setMaterials(response.data.filter((material) => material.MaterialId !== 1));
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <div>
            <Sidebar />
            <div className="admin-content">
                <h2>Material Management</h2>
                <button className="add-btn" onClick={handleAddMaterial}>Add Material</button>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Label</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material) => (
                            <tr key={material.MaterialId}>
                                <td>{material.MaterialId}</td>
                                <td>{material.Label}</td>
                                <td>
                                    <button
                                        className="update-btn"
                                        onClick={() => handleUpdateMaterial(material)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteMaterial(material)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Update Material Modal */}
            {(showAddModal || showUpdateModal) && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{showAddModal ? "Add Material" : "Update Material"}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="Label">Label</label>
                            <input
                                type="text"
                                id="Label"
                                name="Label"
                                value={materialForm.Label}
                                onChange={handleFormChange}
                                required
                            />
                            <button type="submit" className="save-btn">Save</button>
                            <button type="button" className="cancel-btn" onClick={() => (showAddModal ? setShowAddModal(false) : setShowUpdateModal(false))}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Material Modal */}
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete the material "{selectedMaterial.Label}"?</p>
                        <button className="delete-btn" onClick={deleteMaterial}>Delete</button>
                        <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <FooterBack />
        </div>
    );
};

export default MaterialsManager;
