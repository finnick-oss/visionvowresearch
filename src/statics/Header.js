import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="px-6 py-6 bg-white shadow-md">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-800">
          <Link to="/">VisionVow</Link>
        </h1>
        <ul className={`hidden md:flex space-x-6 text-gray-700`}>
          <li><Link to="/" className="hover:text-blue-800">Home</Link></li>
          <li><Link to="/aboutus" className="hover:text-blue-800">About</Link></li>
          <li><Link to="/dashboard" className="hover:text-blue-800">Dashboard</Link></li>
          <li><Link to="/contactus" className="hover:text-blue-800">Contact Us</Link></li>
        </ul>
        <FaBars className="text-2xl text-gray-700 md:hidden" onClick={toggleMobileMenu} />
      </nav>
      {isMobileMenuOpen && (
        <ul className="flex flex-col items-center mt-4 space-y-4 md:hidden">
          <li><Link to="/" className="block text-gray-700 hover:text-blue-800">Home</Link></li>
          <li><Link to="/aboutus" className="block text-gray-700 hover:text-blue-800">About</Link></li>
          <li><Link to="/dashboard" className="block text-gray-700 hover:text-blue-800">Dashboard</Link></li>
          <li><Link to="/contactus" className="block text-gray-700 hover:text-blue-800">Contact Us</Link></li>
        </ul>
      )}
    </header>
  );
};

export default Header;
