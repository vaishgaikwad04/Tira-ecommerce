import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "ALL",
    sizes: [], // use an array instead of single size
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://zara-ecommerce.onrender.com/api/admin/${id}`);
        const data = res.data.readSingleProduct;

        setFormData({
          name: data.name || "",
          description: data.description || "",
          image: data.image || "",
          price: data.price || "",
          category: data.category || "ALL",
          sizes: data.sizes || [], // populate multiple sizes
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedSizes = selectedOptions.map((opt) => opt.value);
    setFormData((prev) => ({
      ...prev,
      sizes: selectedSizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://zara-ecommerce.onrender.com/api/admin/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Product updated:", res.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const sizesAvailable = ["S", "M", "L", "XL", "XXL"];

  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-normal mb-6 py-6 text-left">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
        <input
          type="number"
          className="w-full px-4 py-2 border rounded"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Select Available Sizes:
          </label>
          <div className="grid grid-cols-3 gap-4">
            {sizesAvailable.map((size) => (
              <label
                key={size}
                className="flex items-center space-x-2 border p-2 rounded hover:bg-gray-50 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <select
          className="w-full px-4 py-2 border rounded"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="ALL">ALL</option>
          <option value="NEW">NEW</option>
          <option value="DRESSES">DRESSES</option>
          <option value="TOPS">TOPS</option>
          <option value="BODYSUITES">BODY SUITS</option>
        </select>

        <button
          type="submit"
          className="w-40 bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
