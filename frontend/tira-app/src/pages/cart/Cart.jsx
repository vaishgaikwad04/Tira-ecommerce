import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { IoAdd } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        "https://zara-ecommerce.onrender.com/api/cart/read",
        {
          withCredentials: true,
        },
      );
      setCartData(res.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    const calcTotal = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal(calcTotal);
  }, [cartData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://zara-ecommerce.onrender.com/api/cart/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      // Immediately update local cartData state to remove deleted item
      setCartData((prevCart) => prevCart.filter((item) => item._id !== id));

      // Optional: fetch latest data from server to ensure sync
      // await fetchProduct();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleInc = (id) => {
    const updatedCart = cartData.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCartData(updatedCart);
  };

  const handleDec = (id) => {
    const updatedCart = cartData.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setCartData(updatedCart);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51RXZvhPid00UItquuwWvzhYyDPzvqnrIXagBOdQ2m67MiOU9w8Tz1qpzDncy5RbpzbuBRLZqTvO0DTA6T9eD5QZm00eG2Zdq35",
    );

    try {
      const res = await axios.post(
        "https://zara-ecommerce.onrender.com/api/create-checkout-session",
        cartData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const session = res.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="max-w-6xl mt-30 mx-26 py-24">
      {cartData.length === 0 ? (
        <p className="text-center text-gray-600">Cart is empty!</p>
      ) : (
        <div className="space-y-6">
          {cartData.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center bg-white rounded shadow-sm p-12 gap-6"
            >
              {/* Image */}
              <div className="w-full md:w-32">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-2/3">
                <h2 className="text-md font-normal">{item.name}</h2>

                {item.sizes && (
                  <p className="text-gray-900 my-1">Size: {item.sizes}</p>
                )}

                <p className="text-gray">Price: ${item.price}</p>

                <div className="flex gap-2 items-center">
                  <button onClick={() => handleInc(item._id)}>
                    <IoAdd />
                  </button>

                  <p className="text-gray-700">Quantity: {item.quantity}</p>

                  <button
                    onClick={() => handleDec(item._id)}
                    disabled={item.quantity <= 1}
                  >
                    <IoMdRemove />
                  </button>
                </div>

                <div className="text-lg font-normal mt-4">
                  Total: <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => makePayment()}
                  className="mt-4 px-4 py-1 text-sm border rounded"
                >
                  Checkout
                </button>
              </div>

              {/* Delete Button */}
              <button onClick={() => handleDelete(item._id)}>
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
