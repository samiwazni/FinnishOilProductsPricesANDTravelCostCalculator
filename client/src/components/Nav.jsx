import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ toggleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              FOTC
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/tabel"
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Finnish Oil Products Prices
            </Link>
            <Link
              to="/calculateconsumption"
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Calculate Consumption
            </Link>

            {/* Dark/Light Mode Toggle (Desktop) */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              {darkMode ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-cyan-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m8.66-8.66h1M4.34 12H3m15.07 6.93l-.71-.71M6.34 6.34l-.71-.71m12.73 12.73l-.71-.71M6.34 17.66l-.71-.71M12 5a7 7 0 110 14 7 7 0 010-14z"
                    />
                  </svg>
                  <span className="text-cyan-400">Dark</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 5.95l-1.41-1.41M6.46 6.46l-1.41-1.41m12.73 12.73l-1.41-1.41M6.46 17.54l-1.41-1.41"
                    />
                  </svg>
                  <span className="text-purple-500">Light</span>
                </>
              )}
            </button>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none mr-4"
            >
              <svg
                className="h-6 w-6 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12" // Close (X) icon
                      : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                  }
                />
              </svg>
            </button>

            {/* Dark/Light Mode Toggle (Mobile) */}
            <button
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.66-8.66h1M4.34 12H3m15.07 6.93l-.71-.71M6.34 6.34l-.71-.71m12.73 12.73l-.71-.71M6.34 17.66l-.71-.71M12 5a7 7 0 110 14 7 7 0 010-14z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 5.95l-1.41-1.41M6.46 6.46l-1.41-1.41m12.73 12.73l-1.41-1.41M6.46 17.54l-1.41-1.41"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-left dark:bg-gray-900 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="self-end mb-6 bg-gray-200 dark:bg-gray-800 p-2 rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6 text-gray-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Link
            to="/tabel"
            onClick={toggleMenu} // Close menu on click
            className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium mb-4"
          >
            Finnish Oil Products Prices
          </Link>
          <Link
            to="/calculateconsumption"
            onClick={toggleMenu} // Close menu on click
            className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Calculate Consumption
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
