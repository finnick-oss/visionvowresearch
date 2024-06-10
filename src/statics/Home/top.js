import React from 'react';
import { Link } from 'react-router-dom';

function Top() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-20 sm:py-48 ">
      <div className="flex flex-col items-center justify-center w-11/12 text-center sm:w-9/12">
        <div className="text-xs text-orange-500 sm:text-base">🔥 BEST MARKETING AGENCY 2024 IN INDIA</div>
        <h1 className="mb-4 font-sans text-4xl font-bold leading-tight text-gray-800 sm:text-5xl md:text-5xl">Welcome to <span>Visionvowresearch</span></h1>
        <p className="w-11/12 mb-8 text-sm text-gray-600 sm:w-8/12 md:w-6/12 sm:text-base">
          Marketing is more powerful, effective and efficient for your business growth with Marketplus.
        </p>
        <div className="flex items-center justify-center space-x-3 sm:flex-row sm:space-x-6">
          <Link to="/aboutus" className="px-5 py-2 text-base border border-gray-300 rounded-full sm:py-4 sm:text-xl sm:px-7 hover:bg-gray-200">About Us</Link>
          <Link to="/dashboard" className="px-5 py-2 text-base text-white bg-blue-800 rounded-full sm:py-4 sm:text-xl sm:px-7 hover:bg-blue-700">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default Top;
