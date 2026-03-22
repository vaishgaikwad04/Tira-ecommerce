import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("https://zara-ecommerce.onrender.com/api/product/read");
        setProducts(res.data.readProduct);
        console.log(res.data);
      } catch (error) {
        console.log("Server error:", error.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="">

      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="flex flex-col w-90 space-y-4">
          {products.map((item) => (
            <Link
              to={`/products/description/${item._id}`}
              key={item._id}
              className="flex items-start space-x-4 py-6 h-30 shadow-md hover:bg-gray-50 p-2 rounded transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-22 object-cover shadow-md  rounded"
              />
              <div className="flex  flex-col">
                <h1 className="text-sm font-medium text-gray-800">{item.name}</h1>
                <h2 className="text-green-600 font-semibold text-sm">Rs. {item.price}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommended;
