import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import { APIRequest, API_URL } from "../../../helper";

const ContentManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await APIRequest("GET", "Products");
      if (!response.success) {
        throw new Error("Failed to fetch products");
      }
      setProducts(response.return.map((product) => ({
        ProductId: product.ProductId,
        Name: product.Name,
        Categories: product.Categories.map((category) => category.CategoryId),
        Description: product.Description,
        Price: product.Price,
        Stock: product.Stock,
        Color: product.Color,
        Images: product.Pictures,
      })));
    } catch (error) {
      console.error(error);
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
    fetchProducts();
    fetchCategories();
  }, []);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    Name: "",
    Categories: [],
    Description: "",
    Price: "",
    Quantity: "",
    Color: "",
    Images: [],
  });
  const [updateFormData, setUpdateFormData] = useState({
    Name: "",
    Categories: [],
    Description: "",
    Price: "",
    Quantity: "",
    Color: "",
    Images: [],
  });
  const [existingImages, setExistingImages] = useState([]);

  const handleProductSelection = (productId, data) => {
    setSelectedProductId(productId);
    setUpdateFormData(data);
    setExistingImages(data.Images.map((image) => image.Link));
  };

  const handleDelete = async (productId) => {
    await APIRequest("delete", `Products/${productId}`);
    await fetchProducts();
  };

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  const handleCreateInputChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateInputChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    let value = [];

    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setCreateFormData({
      ...createFormData,
      Categories: value,
    });

    setUpdateFormData({
      ...updateFormData,
      Categories: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFiles = Array.from(e.target.files);

    setCreateFormData((prevFormData) => ({
      ...prevFormData,
      Images: [...prevFormData.Images, ...imageFiles],
    }));

    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      Images: [...prevFormData.Images, ...imageFiles],
    }));
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
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload images");
      }

      setUploadProgress(0);

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleCreateSubmit = async () => {
    const imageUploadResponse = await uploadImages(createFormData.Images);

    if (imageUploadResponse) {
      await APIRequest("POST", `Products`, {
        Name: createFormData.Name,
        Description: createFormData.Description,
        Price: createFormData.Price,
        Stock: createFormData.Quantity,
        Categories: createFormData.Categories,
        Pictures: imageUploadResponse.images.map((image) => image.Link), // Adjust this based on your API response
      });

      await fetchProducts();
      setShowCreateModal(false);
    }
  };

  const handleUpdateSubmit = async () => {
    let newImageLinks = existingImages;
    const newImages = updateFormData.Images.filter(
      (img) => !existingImages.some((existingImg) => existingImg.name === img.name)
    );

    if (newImages.length > 0) {
      const imageUploadResponse = await uploadImages(newImages);
      if (imageUploadResponse) {
        newImageLinks = [...newImageLinks, ...imageUploadResponse.images.map((image) => image.Link)]; // Adjust this based on your API response
      }
    }

    await APIRequest("PUT", `Products/${selectedProductId}`, {
      Name: updateFormData.Name,
      Description: updateFormData.Description,
      Price: updateFormData.Price,
      Stock: updateFormData.Quantity,
      Categories: updateFormData.Categories,
      Pictures: newImageLinks,
    });

    await fetchProducts();
    setShowUpdateModal(false);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  return (
    <div>
      <Sidebar />
      <div className="content-content">
        <h2>Content Management</h2>
        <div className="tables-container">
          <table className="content-management create-table">
            <thead>
              <tr>
                <th>Create Product</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button className="create" onClick={handleCreate}>
                    Add New Product
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="content-management update-table">
            <thead>
              <tr>
                <th>Update Product</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ProductId}>
                  <td
                    onClick={() => {
                      handleProductSelection(product.ProductId, {
                        Name: product.Name,
                        Categories: product.Categories,
                        Price: product.Price,
                        Description: product.Description,
                        Quantity: product.Stock,
                        Color: product.Color,
                        Images: product.Images,
                      });
                      handleUpdate();
                    }}
                  >
                    {product.Name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="content-management delete-table">
            <thead>
              <tr>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ProductId}>
                  <td>
                    {product.Name}
                    <button
                      className="delete"
                      onClick={() => handleDelete(product.ProductId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for Create Product */}
      {showCreateModal && (
        <div className="modal-management">
          <div className="modal-content-management">
            <span className="close" onClick={() => setShowCreateModal(false)}>
              &times;
            </span>
            <h3>Create Product</h3>
            <label htmlFor="createName">Name:</label>
            <input
              type="text"
              id="createName"
              name="Name"
              value={createFormData.Name}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createCategory">Categories:</label>
            <select
              id="createCategory"
              name="Categories"
              value={createFormData.Categories}
              onChange={handleCategoryChange}
              multiple={true}
            >
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.Name}
                </option>
              ))}
            </select>
            <label htmlFor="createDescription">Description:</label>
            <input
              type="text"
              id="createDescription"
              name="Description"
              value={createFormData.Description}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createPrice">Price:</label>
            <input
              type="number"
              id="createPrice"
              name="Price"
              value={createFormData.Price}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createQuantity">Quantity:</label>
            <input
              type="text"
              id="createQuantity"
              name="Quantity"
              value={createFormData.Quantity}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createColor">Color:</label>
            <input
              type="text"
              id="createColor"
              name="Color"
              value={createFormData.Color}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createImages">Image:</label>
            <input
              type="file"
              id="createImages"
              name="Images"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              multiple={true}
            />
            {uploadProgress > 0 && (
              <div>
                <progress value={uploadProgress} max="100" />
                <span>{uploadProgress}%</span>
              </div>
            )}
            <button onClick={handleCreateSubmit}>Submit</button>
          </div>
        </div>
      )}
      {/* Modal for Update Product */}
      {showUpdateModal && (
        <div className="modal-management">
          <div className="modal-content-management">
            <span className="close" onClick={() => setShowUpdateModal(false)}>
              &times;
            </span>
            <h3>Update Product</h3>
            <label htmlFor="updateName">Name:</label>
            <input
              type="text"
              id="updateName"
              name="Name"
              value={updateFormData.Name}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateCategory">Categories:</label>
            <select
              id="updateCategory"
              name="Categories"
              value={updateFormData.Categories}
              onChange={handleCategoryChange}
              multiple={true}
            >
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.Name}
                </option>
              ))}
            </select>
            <label htmlFor="updateDescription">Description:</label>
            <input
              type="text"
              id="updateDescription"
              name="Description"
              value={updateFormData.Description}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updatePrice">Price:</label>
            <input
              type="number"
              id="updatePrice"
              name="Price"
              value={updateFormData.Price}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateQuantity">Quantity:</label>
            <input
              type="text"
              id="updateQuantity"
              name="Quantity"
              value={updateFormData.Quantity}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateColor">Color:</label>
            <input
              type="text"
              id="updateColor"
              name="Color"
              value={updateFormData.Color}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateImages">Image:</label>
            <input
              type="file"
              id="updateImages"
              name="Images"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              multiple={true}
            />
            {existingImages.length > 0 && (
              <div>
                <p>Existing Images:</p>
                {existingImages.map((image, index) => (
                  <div key={index} style={{ position: "relative", display: "inline-block", margin: "5px" }}>
                    <img src={`${API_URL}/${image}`} alt="product" style={{ width: "100px" }} />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
                        background: "grey",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        padding: "0",
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            {uploadProgress > 0 && (
              <div>
                <progress value={uploadProgress} max="100" />
                <span>{uploadProgress}%</span>
              </div>
            )}
            <button onClick={handleUpdateSubmit}>Submit</button>
          </div>
        </div>
      )}
      <FooterBack />
    </div>
  );
};

export default ContentManagement;
