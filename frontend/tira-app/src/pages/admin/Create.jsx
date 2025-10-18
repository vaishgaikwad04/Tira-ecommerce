import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "ALL",
    sizes: [], // change from size: "" to sizes: []
  });

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
  
    const finalData = {
      ...formData,
      sizes, // <-- add sizes from state
    };
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/create",
        finalData,
        {
          withCredentials: true,
        }
      );
      console.log("Product created:", res.data);
      setFormData({
        name: "",
        description: "",
        image: "",
        price: "",
        category: "ALL",
        sizes: [],
      });
      setSizes([]); // Clear checkbox state too
    } catch (error) {
      console.error("Error creating product:", error);
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        
<div className="mb-4">
  <label className="block mb-2 font-medium text-gray-700">Select Available Sizes:</label>
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
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">ALL</option>
          <option value="NEW">NEW</option>
          <option value="DRESSES">DRESSES</option>
          <option value="TOPS">TOPS</option>
          <option value="BODYSUITES">BODY SUITS</option>
        </select>

        <button
          type="submit"
          className="w-40 bg-black text-white p-2 rounded transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
