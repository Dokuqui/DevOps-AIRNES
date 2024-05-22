import React, { useEffect, useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";
import { APIRequest } from "../../../helper";

const ContentManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
        Images: product.Images,
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

  const handleProductSelection = (productId, data) => {
    setSelectedProductId(productId);
    console.log(data);
    setUpdateFormData(data);
  };

  const handleDelete = async (productId) => {
    // setProducts(products.filter((product) => product.ProductId !== productId));
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
      Images: imageFiles,
    }));
  };

  const handleCreateSubmit = async () => {

    await APIRequest("POST", `Products`, {
      Name: createFormData.Name,
      Description: createFormData.Description,
      Price: createFormData.Price,
      Stock: createFormData.Quantity,
      Categories: createFormData.Categories,
    });

    await fetchProducts();
    
    // setProducts([...products, newProduct]);
    setShowCreateModal(false);
  };

  const handleUpdateSubmit = async () => {
    console.log(updateFormData);

    await APIRequest("PUT", `Products/${selectedProductId}`, {
      Name: updateFormData.Name,
      Description: updateFormData.Description,
      Price: updateFormData.Price,
      Stock: updateFormData.Quantity,
      Categories: updateFormData.Categories,
    });

    // const updatedProducts = products.map((product) =>
    //   product.ProductId === selectedProductId
    //     ? { ...product, ...updateFormData }
    //     : product
    // );

    await fetchProducts();

    // console.log(updatedProducts);
    // setProducts(updatedProducts);
    setShowUpdateModal(false);
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
                      handleProductSelection(product.ProductId,
                        {
                          Name: product.Name,
                          Categories: product.Categories,
                          Price: product.Price,
                          Description: product.Description,
                          Quantity: product.Stock,
                          Color: product.Color,
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
              {categories.map((Categories) => (
                <option key={Categories.CategoryId} value={Categories.CategoryId}>
                  {Categories.Name}
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
              type="text"
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
              multiple={true} // Allow add multiple images
            />
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
              {categories.map((Categories) => (
                <option key={Categories.CategoryId} value={Categories.CategoryId}>
                  {Categories.Name}
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
              type="text"
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
            />
            <button onClick={handleUpdateSubmit}>Submit</button>
          </div>
        </div>
      )}
      <FooterBack />
    </div>
  );
};

export default ContentManagement;