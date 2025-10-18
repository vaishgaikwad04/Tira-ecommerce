// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-center py-4 mt-10 border-t">
      <p className="text-gray-600 font-normal text-sm">
        &copy; {new Date().getFullYear()} ZARA. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
