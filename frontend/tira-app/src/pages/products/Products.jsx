import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Dummy userId for demo purposes
//const userId = "user123"; // Replace with actual user ID (from context/auth)

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({}); 
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/read");
        setProducts(res.data.readProduct);
      } catch (error) {
        console.error("LIKE ERROR:", error); // Add this for better debugging
        return res.status(500).json({ message: "An error occurred.", error: error.message });
      }
      
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/getUserId', {
          withCredentials: true
        });
        setUserId(res.data.userId);  // <-- save userId here
      } catch (err) {
        console.error('Failed to get user ID:', err);
      }
    };
    getUserId();
  }, []);


  const handleLike = async (productId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/likes/${productId}`,{userId});
      console.log(res.data)
      setLikes((prevLikes) => ({
        ...prevLikes,
        [productId]: !prevLikes[productId],
      }));
    } catch (err) {
      console.error("Like toggle failed", err);
    }
    
  };

  return (
    <div className="p-8 bg-white mt-20">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
          {products.map((item) => (
            <div key={item._id} className="pt-10 px-4 rounded ">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto object-cover rounded"
                />
                <button
                  onClick={() => handleLike(item._id)}
                  className="absolute top-4 right-2 text-red-500 text-xl"
                >
                  {likes[item._id] ? <FaHeart /> : <IoIosHeartEmpty />}
                </button>
              </div>
              <h1  onClick={() => navigate(`/products/description/${item._id}`)} className="mt-4 underline underline-offset-4 ">{item.name}</h1>
              <p className="text-black mt-2">
               $ {item.price}.00
              </p>
            
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
