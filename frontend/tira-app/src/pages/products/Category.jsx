import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('ALL'); // Store selected category
  const [categoryData, setCategoryData] = useState([]); // Store data fetched from API
  const categories = ['ALL', 'NEW', 'DRESSES', 'TOPS', 'BODYSUITES'];

  const handleCategoryClick = (item) => {
    setCategory(item);
  };

  useEffect(() => {
    // Only fetch product data if a category is selected
    if (category) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/product/category/${category}`);
          setCategoryData(res.data.categories);  // Assuming 'categories' is the correct field in the response
          console.log(res.data.categories);  // Log the response to inspect the structure
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      };
      fetchProduct();
    }
  }, [category]); // Dependency array: re-fetch when 'category' changes

  const handleClick = (id) => {
    navigate(`/products/description/${id}`);

  }

  return (
    <div className="container flex py-8">
      {/* Category Selection */}
      <div className="fixed w-40 mt-40 py-4 left-20 ">
        {categories.map((item, index) => (
          <div key={index} className="text-left py-7 relative ">
            <button
              className=" h-8 text-black opacity-80 rounded-lg cursor-pointer transition-transform transform hover:scale-110 "
              onClick={() => handleCategoryClick(item)}

            >{item}</button>
          </div>
        ))}
      </div>

      {/* Display Products Based on Selected Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8 mt-18  ml-34">
        {categoryData.length > 0 ? (
          categoryData.map((item) => (
            <div key={item._id} className="mt-6 rounded-lg py-4 duration-300">
              <img 
                src={item.image} // Assuming there's an 'image' field in your API response
                alt={item.name}
                className="w-full h-auto object-cover rounded-lg "
              />
              <h2 onClick={() => handleClick(item._id)} className="text-md py-2 font-normal  text-center underline underline-offset-4">{item.name}</h2>
            </div>
          ))
        ) : (

          <p className="relative top-60  left-70 col-span-full text-center text-xl text-gray-500">No products found for this category.</p>
         
        )}

      </div>
    </div>
  );
};

export default Category;
