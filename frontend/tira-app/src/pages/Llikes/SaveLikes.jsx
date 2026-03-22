import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SaveLikes = () => {
  const [userId, setUserId] = useState(null);
  const [fetchLikeProducts, setFetchLikeProducts] = useState([]);

  // Get user ID
  useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await axios.get(
          "https://zara-ecommerce.onrender.com/api/auth/getUserId",
          {
            withCredentials: true,
          }
        );
        setUserId(res.data.userId);
        console.log("User ID:", res.data.userId);
      } catch (err) {
        console.error("Failed to get user ID:", err);
      }
    };
    getUserId();
  }, []);

  // Fetch liked products when userId is available
  useEffect(() => {
    if (!userId) return;

    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `https://zara-ecommerce.onrender.com/api/likeProducts/${userId}`
        );
        console.log("Liked Products:", res.data);
        setFetchLikeProducts(res.data.likedProducts);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikes();
  }, [userId]);

  const handleClick = async (productId) => {
    try {
      const res = await axios.delete(
        `https://zara-ecommerce.onrender.com/api/likes/delete/${productId}`
      );
      console.log(res.data);

      // Wait 2 seconds, then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting product like:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {fetchLikeProducts.map((item) => (
          <div
            key={item._id}
            className="p-4 flex flex-col items-center bg-white  transition duration-200"
          >
            <button onDoubleClick={() => handleClick(item._id)}>
              <img
                src={item.productId?.image}
                alt={item.productId?.name}
                className="w-full h-auto object-cover mb-4 rounded"
              />
            </button>
            <h3 className="text-sm font-normal text-gray-800 py-2 text-center hover:underline underline-offset-4">
              <Link to={`/products/description/${item.productId?._id}`}>
                {item.productId?.name || "Unnamed Product"}
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaveLikes;
