import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css';

const Footer = () => {
  return (
    <div className="px-4 pt-10 mx-auto border-t sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid row-gap-10 mb-8 gap-28 sm:grid-cols-1 lg:grid-cols-3">
        <div className="sm:col-span-1">
          <Link to="/" aria-label="Go home" title="Company" className="inline-flex items-center w-full">
            <p className="text-xl font-bold tracking-wide text-left text-gray-800 ">VisionVow</p>
          </Link>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-left text-gray-800 text">
              At VisionVow, we strive to dig out accurate data for our clients.
            </p>
            <p className="mt-4 text-sm text-left text-gray-800">
              Without reliable, actionable information, a business is just a bunch of people shooting new ideas on a blank wall.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start space-y-4 text-sm sm:col-span-1">
          <p className="text-base font-bold tracking-wide text-left text-gray-900">Contact Us</p>
          <div className="text-left">
            <span className="mr-1 font-medium text-gray-800">Phone:</span>
            <a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">+91 (995) 3981-772</a>
          </div>
          <div className="text-left">
            <span className="mr-1 font-medium text-gray-800">Email:</span>
            <a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">vision@visionvowresearch.com</a>
          </div>
          <div className="text-left">
            <span className="mr-1 font-medium text-gray-800">Address:</span>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              C-1/63 Sanjay enclave Uttam nagar New Delhi 110059
            </a>
          </div>
        </div>
        <div className="sm:col-span-1">
          <p className="text-base font-bold tracking-wide text-left text-gray-900">Quick Links</p>
          <div className="flex flex-col mt-3 space-y-3 text-left">
            <Link to="/aboutus" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">About</Link>
            <Link to="/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">Home</Link>
            <Link to="/dashboard" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row" >
        <p className="text-sm text-gray-600">
          &copy; Copyright 2024 VisionVow. All rights reserved.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <Link to="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">F.A.Q</Link>
          </li>
          <li>
            <Link to="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">Terms &amp; Conditions</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
