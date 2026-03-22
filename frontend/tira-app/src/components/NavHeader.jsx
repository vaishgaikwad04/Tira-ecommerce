import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent z-50  py-4 px-12">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
        <Link to="/" className="hidden md:block">
          <img
            className="w-70 h-auto py-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoaeP4HqunN0GjhrV-e6b1hmaWbEXCeElqfw&s"
            alt="Logo"
          />
        </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
