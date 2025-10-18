import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./pages/user/App.css";

import Auth from "./pages/user/Auth";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Logout from "./pages/user/Logout";

import ProtectedRoutes from "./pages/user/ProtectedRoutes";

import Read from "./pages/admin/Read";
import Create from "./pages/admin/Create";
import Update from "./pages/admin/Update";

import Layout from "./components/layout/Layout";
import Products from "./pages/products/Products";
import ProductDescription from "./pages/products/ProductDescription";
import Category from "./pages/products/Category";
import Cart from "./pages/cart/Cart";

import Success from "./pages/cart/Success";
import Cancel from "./pages/cart/Cancel";

import CreateReview from "./pages/reviewsProduct/CreateReview";
import ReadReview from "./pages/reviewsProduct/ReadReview";
import SaveLikes from "./pages/Llikes/SaveLikes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="logout"
            element={
              <ProtectedRoutes>
                <Logout />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* Admin */}
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />

        {/* Main App Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route
            path="products/description/:id"
            element={<ProductDescription />}
          />
          <Route path="products/category" element={<Category />} />
          <Route path="cart/read" element={<Cart />} />

          <Route
            path="/likes"
            element={
              <ProtectedRoutes>
                <SaveLikes />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* Cart Result Pages */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* Review Pages */}
        <Route path="/w" element={<CreateReview />} />
        <Route path="/r" element={<ReadReview />} />
      </Routes>
    </Router>
  );
}

export default App;
