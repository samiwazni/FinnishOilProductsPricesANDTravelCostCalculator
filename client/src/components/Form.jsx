import React from "react";
import LoadData from "./LoadData";

const Form = () => {
  return (
    <div>
      <form className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg space-y-6 text-gray-300">
      {/* Language Selection */}
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-1">Choose language</label>
        <select id="language" name="language" className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="1">EN</option>
          <option value="2">FI</option>
          <option value="3">SE</option>
        </select>
      </div>

      {/* Distance Traveled Field */}
      <div>
        <label htmlFor="distance" className="block text-sm font-medium text-gray-400 mb-1">Distance traveled (km)</label>
        <input type="number" name="distance" id="distance" placeholder="km" className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      {/* Fuel Used Field */}
      <div>
        <label htmlFor="fuel_used" className="block text-sm font-medium text-gray-400 mb-1">Fuel used (L)</label>
        <input type="number" name="fuel_used" id="fuel_used" placeholder="L" className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      {/* Fuel Consumption Field */}
      <div>
        <label htmlFor="fuel_consumption" className="block text-sm font-medium text-gray-400 mb-1">Fuel consumption</label>
        <input type="number" name="fuel_consumption" id="fuel_consumption" placeholder="Liters per 100 kilometers (L/100 km)" className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      {/* Fuel Economy Field */}
      <div>
        <label htmlFor="fuel_economy" className="block text-sm font-medium text-gray-400 mb-1">Fuel economy</label>
        <input type="number" name="fuel_economy" id="fuel_economy" placeholder="km/L" className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      {/* Fuel Type Selection */}
      <div>
        <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-400 mb-1">Fuel Type</label>
        <select id="fuel_type" name="fuel_type" className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="4">95E10</option>
          <option value="5">98E</option>
          <option value="6">E10</option>
        </select>
      </div>
    </form>

    </div>
  );
};

export default Form;
