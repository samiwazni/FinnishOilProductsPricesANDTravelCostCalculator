import React, { useState } from "react";

const Form = () => {
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [fuelEconomy, setFuelEconomy] = useState("");
  const [fuelType, setFuelType] = useState("4");

  // Function to calculate fuel consumption (L/100 km)
  const calculateConsumption = () => {
    if (distance && fuelUsed) {
      const consumption = (fuelUsed / distance) * 100;
      setFuelConsumption(consumption.toFixed(2)); // Set the result to 2 decimal places
    }
  };

  // Function to calculate fuel economy (km/L)
  const calculateEconomy = () => {
    if (distance && fuelUsed) {
      const economy = distance / fuelUsed;
      setFuelEconomy(economy.toFixed(2)); // Set the result to 2 decimal places
    }
  };

  // Handle form submission to calculate results
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateConsumption();
    calculateEconomy();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg text-gray-300"
      >
        <h1 className="text-left text-3xl mb-8">Calculate fuel consumption</h1>
        {/* Distance Traveled Field */}
        <div>
          <label
            htmlFor="distance"
            className="block text-sm font-medium text-gray-400 mb-1 mt-3 text-left "
          >
            Distance traveled (km)
          </label>
          <input
            type="number"
            name="distance"
            id="distance"
            placeholder="km"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fuel Used Field */}
        <div>
          <label
            htmlFor="fuel_used"
            className="block text-sm font-medium text-gray-400 mb-1 mt-3 text-left"
          >
            Fuel used (L)
          </label>
          <input
            type="number"
            name="fuel_used"
            id="fuel_used"
            placeholder="L"
            value={fuelUsed}
            onChange={(e) => setFuelUsed(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fuel Consumption Field */}
        <div>
          <label
            htmlFor="fuel_consumption"
            className="block text-sm font-medium text-gray-400 mb-1 mt-3 text-left"
          >
            Fuel consumption (L/100 km)
          </label>
          <input
            type="number"
            name="fuel_consumption"
            id="fuel_consumption"
            placeholder="Liters per 100 kilometers (L/100 km)"
            value={fuelConsumption}
            readOnly
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fuel Economy Field */}
        <div>
          <label
            htmlFor="fuel_economy"
            className="block text-sm font-medium text-gray-400 mb-1 mt-3 text-left"
          >
            Fuel economy (km/L)
          </label>
          <input
            type="number"
            name="fuel_economy"
            id="fuel_economy"
            placeholder="km/L"
            value={fuelEconomy}
            readOnly
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Form;
