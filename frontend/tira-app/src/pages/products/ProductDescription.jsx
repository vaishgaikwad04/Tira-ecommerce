import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CreateReview from "../reviewsProduct/CreateReview";
import ReadReview from "../reviewsProduct/ReadReview";


const ProductDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

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
      } catch (err) {
        console.error("Failed to get user ID:", err);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(
          `https://zara-ecommerce.onrender.com/api/product/read/${id}`
        );
        setProduct(res.data.readSingle);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product)
    return (
      <p className="relative top-60 left-140 p-6 text-gray-600">
        Product not found.
      </p>
    );

  const discountedPrice = (product.price * 0.9).toFixed(2);

  const handleCart = async () => {
    if (!userId) {
      return;
    }

    const cartItem = {
      userId,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      sizes :selectedSize,
      image: product.image,
    };

    try {
      const res = await axios.post(
        "https://zara-ecommerce.onrender.com/api/cart/create",
        cartItem
      );
      alert(res.data.message);
      console.log(res.data)
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert(
        "There was an error adding the product to the cart. Please try again."
      );
    }
  };

  return (
    <>
      {/* Main Product Section */}
      <div className="flex flex-col w-full lg:flex-row justify-between px-6 py-40 gap-8">
        <div className="w-full lg:w-2/1 bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-md"
            />

            <div className="w-full py-8 leading-loose px-10">
              <h3 className="pt-4 text-gray-600 text-sm">FEW ITEMS LEFT</h3>
              <h1 className="text-2xl text-gray-800 pb-2">{product.name}</h1>
              <div className="font-normal">
                Rs. {discountedPrice}
                <span className="ml-1 text-sm text-black font-light">
                  (10% off)
                </span>
              </div>
              <h4 className="pb-12 text-gray-600 text-sm">
                MRP incl. of all taxes
              </h4>
              <hr />
              <div>
                <div className="py-10">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-sm  py-2">
                    {product.sizes.map((size, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded text-center transition ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <h2 className="text-gray-600 text-sm mb-10">
                  Pink / White | 3067/229/046
                </h2>
                <button
                  onClick={handleCart}
                  className="bg-white text-black border mt-2 w-90 h-10 rounded transition hover:bg-black hover:text-white"
                >
                  ADD
                </button>
              </div>

              {/* Clickable Description */}
              <div
                onClick={() => setShowInfoPanel(true)}
                className="cursor-pointer hover:bg-gray-50 ml-1 py-10 text-gray-700 text-sm leading-loose space-y-3 transition"
              >
                {product.description.split(",").map((part, idx) => (
                  <p key={idx}>{part.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Info Panel */}
      {showInfoPanel && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-40"
          onClick={() => setShowInfoPanel(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[704px] py-20 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          showInfoPanel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-15 mx-12 px-6 overflow-y-auto h-full relative">
          <button
            onClick={() => setShowInfoPanel(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
          <h1 className="text-2xl  mb-4">{product.name}</h1>
          <p className="text-gray-900 mb-2">Rs. {discountedPrice}</p>

          <p className="text-sm text-gray-500 mb-6">MRP incl. of all taxes</p>
          <hr />
          <div className="text-sm text-gray-600 py-8 mr-30 leading-loose space-y-2">
            {product.description.split(",").map((part, idx) => (
              <p key={idx}>{part.trim()}</p>
            ))}
          </div>
          <button
            onClick={handleCart}
            className=" text-black bg-white border w-100 py-2 rounded"
          >
            ADD
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-gray-300" />

      {/* Reviews Section */}
      <div className="px-6 pb-20">
        <CreateReview productId={product._id} />
        <ReadReview productId={product._id} userId={userId} />
      </div>
    </>
  );
};

export default ProductDescription;
