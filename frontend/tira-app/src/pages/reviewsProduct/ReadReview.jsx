import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const ReadReview = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);

  const fetchReview = async () => {
    try {
      const res = await axios.get(
        `https://zara-ecommerce.onrender.com/api/read/${productId}`,
        {
          params: { userId },
          withCredentials: true,
        }
      );
      setReviews(res.data.data);
    } catch (err) {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Fetch role once on mount
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          "https://zara-ecommerce.onrender.com/api/auth/getUserId",
          {
            withCredentials: true,
          }
        );
        setRole(res.data.role);
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };
    fetchRole();
  }, []);

  // Delete review and refresh
  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`https://zara-ecommerce.onrender.com/api/delete/${reviewId}`, {
        withCredentials: true,
      });
      fetchReview();
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  // Auto-refresh reviews every 1 second
  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    fetchReview(); // initial fetch

    const interval = setInterval(() => {
      fetchReview();
    }, 2000); // refresh every 1 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, [productId, userId]);

  if (loading) return <p className="text-blue-500">Loading reviews...</p>;

  return (
    <div className="max-w-7xl mt-4 p-4 bg-white shadow-md rounded-md">
      {reviews.length === 0 ? (
        <p>No reviews yet for this product.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-200 py-4 flex justify-between items-start"
          >
            <div>
              <p className="text-gray-700">
                {review.userName ||
                  (typeof review.userId === "object"
                    ? review.userId?.email
                    : review.userId) ||
                  "Anonymous User"}
              </p>
              <p className="text-black">{review.message}</p>
            </div>
            {role === "admin" && (
              <button
                onClick={() => handleDelete(review._id)}
                className="ml-4 px-3 py-1 text-sm"
              >
                <RxCross2 />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReadReview;
