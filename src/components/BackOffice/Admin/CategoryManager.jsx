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
  const [categoryForm, setCategoryForm] = useState({ Name: "", Description: "", Pictures: [], Rooms: [] })
  const [rooms, setRooms] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const getNextId = () => {
    const maxId = Math.max(...categories.map((category) => category.CategoryId));
    return maxId + 1;
  };

  const handleAddCategory = () => {
    setCategoryForm({ Name: "", Description: "", Pictures: [], Rooms: [] });
    setShowAddModal(true);
  };

  const handleUpdateCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
    setCategoryForm({ Name: category.Name, Description: category.Description, Pictures: category.Pictures || [], Rooms: category.Rooms.map(room => room.RoomId) });
    setExistingImages(category.Pictures.map((image) => image.Link));
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
    const imageUploadResponse = await uploadImages(category.Pictures);

    if (imageUploadResponse) {
      const newCategory = { ...category, Pictures: imageUploadResponse.images.map((image) => image.Link) };
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
    let newImageLinks = existingImages;
    const newImages = categoryForm.Pictures.filter(
      (img) => !existingImages.some((existingImg) => existingImg.name === img.name)
    );

    if (newImages.length > 0) {
      const imageUploadResponse = await uploadImages(newImages);
      if (imageUploadResponse) {
        newImageLinks = [imageUploadResponse.images.map((image) => image.Link)]; // Adjust this based on your API response
      }
    }
  
    // Update category with or without new image links
    const response = await APIRequest("PUT", `Categories/${updatedCategory.CategoryId}`, {
      ...updatedCategory,
      Pictures: newImageLinks,
    });
    if (response.success) {
      fetchCategories();
      setShowUpdateModal(false);
    } else {
      console.error(response.message);
    }
  };

  const deleteCategory = async () => {
    await APIRequest("DELETE", `Categories/${selectedCategory.CategoryId}`);

    fetchCategories();

    setSelectedCategory(null);
    setShowDeleteModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "Images") {
      setCategoryForm({ ...categoryForm, Pictures: [...categoryForm.Pictures, value] });
    } else if (name === "RoomId") {
      const selectedRooms = [...categoryForm.Rooms];
      if (selectedRooms.includes(value)) {
        // If already selected, remove it
        const updatedRooms = selectedRooms.filter(roomId => roomId !== value);
        setCategoryForm({ ...categoryForm, Rooms: updatedRooms });
      } else {
        // If not selected, add it
        setCategoryForm({ ...categoryForm, Rooms: [...selectedRooms, value] });
      }
    } else {
      setCategoryForm({ ...categoryForm, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const imageFiles = Array.from(e.target.files);

    setCategoryForm({ ...categoryForm, Pictures: imageFiles });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showAddModal) {
      addCategory(categoryForm);
    } else if (showUpdateModal) {
      updateCategory({ ...selectedCategory, ...categoryForm });
    }
  };

  const handleRoomsChange = (e) => {
    const options = e.target.options;
    let value = [];

    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setCategoryForm({ ...categoryForm, Rooms: value });

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

  const fetchRooms = async () => {
    try {
      const response = await APIRequest("GET", "Rooms");
      if (!response.success) {
        throw new Error("Failed to fetch rooms");
      }
      setRooms(response.return);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRooms();
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
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={categoryForm.Name}
                onChange={handleFormChange}
                required
              />
              <label htmlFor="Description">Description</label>
              <textarea
                id="Description"
                name="Description"
                value={categoryForm.Description}
                onChange={handleFormChange}
                required
              ></textarea>
              <label htmlFor="RoomId">Rooms</label>
              <select
                id="RoomId"
                name="RoomId"
                value={categoryForm.Rooms}
                onChange={handleRoomsChange}
                multiple
                required
              >
                {rooms?.map((room) => (
                  <option key={room.RoomId} value={room.RoomId}>
                    {room.Name}
                  </option>
                ))}
              </select>
              <label htmlFor="Images">Images</label>
              <input
                type="file"
                id="Images"
                name="Images"
                onChange={handleImageChange}
              />
              {categoryForm.Pictures.length > 0 && (
                <div>
                  <p>Existing Images:</p>
                  {categoryForm.Pictures.map((image, index) => (
                    <div key={index} style={{ position: "relative", display: "inline-block", margin: "5px" }}>
                      <img src={`${API_URL}/${image.Link}`} alt="category" style={{ width: "100px" }} />
                    </div>
                  ))}
                </div>
              )}
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
            <p>Are you sure you want to delete the category "{selectedCategory.Name}"?</p>
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
