import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="bg-white dark:bg-gray-900 w-full border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left - Copyright Text */}
        <span className="text-sm text-gray-500 dark:text-gray-400 order-2 md:order-1 mt-4 md:mt-0">
          © {currentYear}{" "}
          <a href="https://github.com/samiwazni/" className="hover:underline text-blue-600 dark:text-blue-400" target="_blank">
            Sami Wazni
          </a>
          . All Rights Reserved.
        </span>

        {/* Center - Logo */}
        <div className="order-1 md:order-2">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            FOTC
          </Link>
        </div>

        {/* Right - Navigation Links */}
        <div className="hidden md:flex space-x-8 flex flex-wrap items-center mt-4 md:mt-0 text-sm font-medium text-gray-500 dark:text-gray-400 order-3 md:order-3">
            <Link to="tabel"
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Finnish Oil Products Prices
            </Link>
            <Link to="calculateconsumption"
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Calculate Consumption
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
