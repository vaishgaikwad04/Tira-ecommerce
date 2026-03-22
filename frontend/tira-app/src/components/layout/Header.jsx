import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent z-50  py-4 px-12">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
        <Link to="/" className="hidden md:block">
          <img
            className="w-70 h-auto py-4"
            src="\src\assets\Zara-Logo-removebg-preview.png"
            alt="Logo"
          />
        </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Navigation */}
        <nav
          className={`absolute top-full left-0 w-full bg-white md:bg-transparent md:static md:w-auto md:flex md:space-x-6 text-gray-700 text-sm mr-20 transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center py-4 md:py-0">
            <Link
              to="/"
              className="px-4 py-2 hover:underline underline-offset-4 font-normal text-md"
            >
              PRODUCTS
            </Link>
            <Link
              to="/products/category"
              className="px-4 py-2 hover:underline underline-offset-4 font-normal text-md"
            >
              FOR YOU
            </Link>
            <Link
              to="/likes"
              className="px-4 py-2 hover:underline underline-offset-4 font-normal text-md"
            >
              FAVOURITES
            </Link>
            <Link
              to="/cart/read"
              className="px-4 py-2 hover:underline underline-offset-4 font-normal text-md"
            >
              SHOPPING BAG
            </Link>
            <Link to="/auth/logout" className="px-4 py-2 hover:underline">LOGOUT</Link>


          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
