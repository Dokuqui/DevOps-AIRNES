import React, { useEffect, useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import "../../../styles/modal_admin.scss";
import "../../../styles/admin.scss";
import { APIRequest, API_URL } from "../../../helper";
import axios from "axios";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ Name: "", Description: "", Images: [] });

  const getNextId = () => {
    const maxId = Math.max(...categories.map((category) => category.CategoryId));
    return maxId + 1;
  };

  const handleAddCategory = () => {
    setCategoryForm({ Name: "", Description: "", Images: [] });
    setShowAddModal(true);
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setCategoryForm({ Name: category.Name, Description: category.Description, Images: category.Images || [] });
    setShowUpdateModal(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const uploadImages = async (images) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("Images", image);
    });

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload images");
      }


      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addCategory = async (category) => {
    // const newCategory = { ...category, CategoryId: getNextId() };
    // setCategories([...categories, newCategory]);
    // setShowAddModal(false);
    const imageUploadResponse = await uploadImages(category.Images);
    
    if (imageUploadResponse) {
      const newCategory = { ...category, Images: imageUploadResponse };
      const response = await APIRequest("POST", "Categories", newCategory);
      if (response.success) {
        fetchCategories();
        setShowAddModal(false);
      } else {
        console.error(response.message);
      }
    }
    
  };

  const updateCategory = async (updatedCategory) => {
    // setCategories(
    //   categories.map((category) => (category.CategoryId === updatedCategory.CategoryId ? updatedCategory : category))
    // );
    // setShowUpdateModal(false);
    const imageUploadResponse = await uploadImages(updatedCategory.Images);

    console.log(imageUploadResponse);

    if (imageUploadResponse) {
      const updatedCategoryWithImages = { ...updatedCategory, Images: imageUploadResponse };
      const response = APIRequest("PUT", `Categories/${updatedCategory.CategoryId}`, updatedCategoryWithImages);
      if (response.success) {
        fetchCategories();
        setShowUpdateModal(false);
      } else {
        console.error(response.message);
      }
    }
  };

  const deleteCategory = () => {
    setCategories(categories.filter((category) => category.CategoryId !== selectedCategory.CategoryId));
    setSelectedCategory(null);
    setShowDeleteModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "Images") {
      setCategoryForm({ ...categoryForm, Images: [...categoryForm.Images, value] });
    } else {
      setCategoryForm({ ...categoryForm, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showAddModal) {
      addCategory(categoryForm);
    } else if (showUpdateModal) {
      updateCategory({ ...selectedCategory, ...categoryForm });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await APIRequest("GET", "Categories");
      if (!response.success) {
        throw new Error("Failed to fetch categories");
      }
      setCategories(response.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="category-content">
        <h2>Category Management</h2>
        <button className="add-btn" onClick={handleAddCategory}>Add Category</button>
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.CategoryId}>
                <td>{category.CategoryId}</td>
                <td>{category.Name}</td>
                <td>{category.Description}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateCategory(category)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCategory(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Update Category Modal */}
      {(showAddModal || showUpdateModal) && (
        <div className="modal">
          <div className="modal-content">
            <h2>{showAddModal ? "Add Category" : "Update Category"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={categoryForm.Name}
                onChange={handleFormChange}
                required
              />
              <label htmlFor="description">Description</label>
              <textarea
                id="Description"
                name="Description"
                value={categoryForm.Description}
                onChange={handleFormChange}
                required
              ></textarea>
              <label htmlFor="images">Images</label>
              <input
                type="file"
                id="Images"
                name="Images"
                onChange={handleFormChange}
                multiple
              />
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={() => (showAddModal ? setShowAddModal(false) : setShowUpdateModal(false))}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the category "{selectedCategory.name}"?</p>
            <button className="delete-btn" onClick={deleteCategory}>Delete</button>
            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <FooterBack />
    </div>
  );
};

export default CategoryManagement;
