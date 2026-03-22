import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import NavHeader from '../../components/NavHeader';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", form);

    try {
      const res = await axios.post(
        "https://zara-ecommerce.onrender.com/api/auth/register",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // <-- Required to include cookies
        }
      );

      console.log(res.data);
      alert("✅ User registered successfully!");
      navigate("/auth/login");
      setForm({ userName: "", email: "", password: "", role: "user" }); // Reset form
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert(`Registration failed: ${error.message}`);
      }
      console.error(
        "Error registering:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
       <NavHeader/>
    <div className="flex items-center justify-center mt-20 min-h-screen">
     
      <div className="w-full max-w-md py-20 space-y-6 ">
      
        <form className="space-y-4 w-100 py-4" onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              name="userName"
              id="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="enter username"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="enter email"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="enter password"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <select
              name="role"
              id="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="stranger">stranger</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-40 py-2 mt-4 text-white bg-black rounded "
            >
              Register
            </button>
          </div>
          <h2 className="py-6 px-10"> Already have an account? <Link to="/auth/login"> <span className="text-blue-700">Sign in</span> </Link>
          </h2>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
