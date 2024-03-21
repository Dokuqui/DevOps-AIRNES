import React, { useState } from "react";
import FooterBack from "./FooterBack";
import Sidebar from "./SideBar";

const ContentManagement = () => {
  // const [products, setProducts] = useState([]);

  // // Fetch products from the database on component mount
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // // Function to fetch products from the database
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("API_ENDPOINT/products");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch products");
  //     }
  //     const data = await response.json();
  //     setProducts(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // Function to handle product deletion
  // const handleDelete = async (productId) => {
  //   try {
  //     const response = await fetch(`API_ENDPOINT/products/${productId}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete product");
  //     }
  //     fetchProducts();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "Description of Product 1" },
    { id: 2, name: "Product 2", description: "Description of Product 2" },
    { id: 3, name: "Product 3", description: "Description of Product 3" },
  ]);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    brand: "",
    color: "",
    size: "",
    quantity: "",
    images: [],
  });
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    brand: "",
    color: "",
    size: "",
    quantity: "",
    images: [],
  });

  const handleProductSelection = (productId, name, category) => {
    setSelectedProductId(productId);
    setUpdateFormData({ name, category });
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
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

  const handleImageChange = (e) => {
    const imageFiles = Array.from(e.target.files);

    setCreateFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...imageFiles],
    }));

    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      image: [...prevFormData.images, ...imageFiles],
    }));
  };

  const handleCreateSubmit = () => {
    const newProduct = {
      id: products.length + 1,
      name: createFormData.name,
      category: createFormData.category,
      description: createFormData.description,
      price: createFormData.price,
      brand: createFormData.brand,
      color: createFormData.color,
      size: createFormData.size,
      quantity: createFormData.quantity,
      images: createFormData.images,
    };
    setProducts([...products, newProduct]);
    setShowCreateModal(false);
  };

  const handleUpdateSubmit = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProductId
        ? { ...product, ...updateFormData }
        : product
    );
    setProducts(updatedProducts);
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
                <tr key={product.id}>
                  <td
                    onClick={() => {
                      handleProductSelection(
                        product.id,
                        product.name,
                        product.category
                      );
                      handleUpdate();
                    }}
                  >
                    {product.name}
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
                <tr key={product.id}>
                  <td>
                    {product.name}
                    <button
                      className="delete"
                      onClick={() => handleDelete(product.id)}
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
              name="name"
              value={createFormData.name}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createCategory">Category:</label>
            <input
              type="text"
              id="createCategory"
              name="category"
              value={createFormData.category}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createDescription">Description:</label>
            <input
              type="text"
              id="createDescription"
              name="description"
              value={createFormData.description}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createPrice">Price:</label>
            <input
              type="text"
              id="createPrice"
              name="price"
              value={createFormData.price}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createBrand">Brand:</label>
            <input
              type="text"
              id="createBrand"
              name="brand"
              value={createFormData.brand}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createSize">Size:</label>
            <input
              type="text"
              id="createSize"
              name="size"
              value={createFormData.size}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createQuantity">Quantity:</label>
            <input
              type="text"
              id="createQuantity"
              name="quantity"
              value={createFormData.quantity}
              onChange={handleCreateInputChange}
            />
            <label htmlFor="createImages">Image:</label>
            <input
              type="file"
              id="createImages"
              name="images"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              multiple // Allow add multiple images
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
              name="name"
              value={updateFormData.name}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateCategory">Category:</label>
            <input
              type="text"
              id="updateCategory"
              name="category"
              value={updateFormData.category}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateDescription">Description:</label>
            <input
              type="text"
              id="updateDescription"
              name="description"
              value={updateFormData.description}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updatePrice">Price:</label>
            <input
              type="text"
              id="updatePrice"
              name="price"
              value={updateFormData.price}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateBrand">Brand:</label>
            <input
              type="text"
              id="updateBrand"
              name="brand"
              value={updateFormData.brand}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateSize">Size:</label>
            <input
              type="text"
              id="updateSize"
              name="size"
              value={updateFormData.size}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateQuantity">Quantity:</label>
            <input
              type="text"
              id="updateQuantity"
              name="quantity"
              value={updateFormData.quantity}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="updateImages">Image:</label>
            <input
              type="file"
              id="updateImages"
              name="images"
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
