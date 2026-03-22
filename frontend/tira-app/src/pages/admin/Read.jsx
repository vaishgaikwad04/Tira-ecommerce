import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";


const Read = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("https://zara-ecommerce.onrender.com/api/admin", {
          withCredentials: true,
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://zara-ecommerce.onrender.com/api/admin/delete/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-normal  py-10 mb-4">Product List</h2>
      <button
  onClick={() => handleClick(() => navigate("/create"))}
  className="ml-294 py-1 px-4 text-center"
>
<IoAddOutline className="w-10 h-10  text-YELLOW-600" />


</button>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found!</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-200 bg-white shadow-md rounded">
            <thead>
              <tr className="">
                <th className="px-6 py-6 text-left border-b font-normal text-md">
                  Name
                </th>
                <th className="px-6 py-6 text-left border-b font-normal">
                  Description
                </th>
                <th className="px-6 py-6 text-left border-b font-normal">
                  Category
                </th>
                <th className="px-6 py-6 text-left border-b font-normal">
                  Image
                </th>
                <th className="px-6 py-6 text-left border-b font-normal">
                  Price
                </th>
                <th className="px-6 py-6 border-b font-normal">Delete</th>
                <th className="px-6 py-6 border-b font-normal">Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-12 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.description}</td>
                  <td className="px-4 py-2 border-b">{item.category}</td>
                  <td className="px-4 py-2 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-2 py-12 border-b">${item.price}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="underline underline-offset-4 text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-700 underline underline-offset-4"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Read;
