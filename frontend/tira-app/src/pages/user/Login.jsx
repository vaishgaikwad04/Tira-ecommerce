import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavHeader from '../../components/NavHeader'

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        {
          withCredentials: true,
        }
      );

      const token = res.data.token;
      console.log("Token:", token); // ✅ Now it will print the token

      console.log(res.data);
      navigate("/products");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="">
       <NavHeader/>
    <div className="flex items-center mt-10 justify-center min-h-screen">
     
      <div className="w-full max-w-md p-8 space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4 w-80 py-4" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        
          <div>
            <button
              type="submit"
              className="w-40 py-2 mt-4 text-white bg-black rounded"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
