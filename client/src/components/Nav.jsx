import React from 'react';

const Nav = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              TCC
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a
              href="tabel"
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Finnish Oil Products Prices
            </a>
            <a
              href="calculateconsumption"
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Calculate Consumption
            </a>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {/* Moon Icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.66-8.66h1M4.34 12H3m15.07 6.93l-.71-.71M6.34 6.34l-.71-.71m12.73 12.73l-.71-.71M6.34 17.66l-.71-.71M12 5a7 7 0 110 14 7 7 0 010-14z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {/* Sun Icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.66-8.66h1M4.34 12H3m15.07 6.93l-.71-.71M6.34 6.34l-.71-.71m12.73 12.73l-.71-.71M6.34 17.66l-.71-.71M12 5a7 7 0 110 14 7 7 0 010-14z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
