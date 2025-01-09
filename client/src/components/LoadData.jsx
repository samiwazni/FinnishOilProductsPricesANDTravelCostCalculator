import React, { useState, useEffect } from "react";
import { fetchFuelData } from "../api"; // Import from api.js

const LoadData = () => {
  const [data, setData] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(""); // Default city selection
  const [cityData, setCityData] = useState([]); // Data for selected city
  const [lastUpdate, setLastUpdate] = useState(""); // Track last update
  const [nextUpdate, setNextUpdate] = useState(""); // Countdown for next update

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFuelData(); // Call API
        if (!result || !Array.isArray(result.fuelPrices)) {
          throw new Error("Invalid data from API");
        }

        // Update state with fetched data
        const fuelPrices = result.fuelPrices || [];
        const updateTime = result.lastUpdate || "Unknown";

        setData(fuelPrices); // Set the full dataset
        setLastUpdate(updateTime); // Set the last update time

        if (fuelPrices.length > 0) {
          setSelectedCity(fuelPrices[0].cityName); // Default to first city
        }

        // Calculate next update time
        const lastUpdatedTime = new Date(updateTime);
        const nextUpdateTime = new Date(lastUpdatedTime.getTime() + 60 * 60 * 1000); // Add 1 hour
        calculateCountdown(nextUpdateTime);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchData();

    // Countdown updater
    const countdownInterval = setInterval(() => {
      const lastUpdatedTime = new Date(lastUpdate);
      const nextUpdateTime = new Date(lastUpdatedTime.getTime() + 60 * 60 * 1000); // Add 1 hour
      calculateCountdown(nextUpdateTime);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(countdownInterval);
  }, [lastUpdate]);

  // Function to calculate the countdown
  const calculateCountdown = (nextUpdateTime) => {
    const currentTime = new Date();
    const timeDiff = nextUpdateTime - currentTime; // Difference in milliseconds

    if (timeDiff <= 0) {
      setNextUpdate("Updating soon...");
      return;
    }

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    setNextUpdate(
      `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`
    );
  };

  // Update cityData when selectedCity changes
  useEffect(() => {
    if (selectedCity && Array.isArray(data)) {
      const filteredData = data.filter((item) => item.cityName === selectedCity);
      setCityData(filteredData); // Update cityData with matching city items
    }
  }, [selectedCity, data]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg text-gray-300">
        <h1 className="text-2xl font-semibold mb-6 text-white text-left">
          Live Finnish Oil Products Prices
        </h1>

        {/* Latest Update */}
        <p className="text-gray-400 text-left mb-1">
          <strong>Latest update:</strong> {lastUpdate}
        </p>
        <p className="text-gray-400 text-left mb-6">
          <strong>Next update in:</strong> {nextUpdate}
        </p>

        {/* City Selection Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-400 mb-1 text-left"
          >
            Select a City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {Array.isArray(data) && data.length > 0 ? (
              [...new Set(data.map((item) => item.cityName))].map(
                (city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                )
              )
            ) : (
              <option value="">No cities available</option>
            )}
          </select>
        </div>

        {/* Loading or Data Table */}
        {loading ? (
          <div className="text-center">
            <span>Loading...</span>
          </div>
        ) : Array.isArray(cityData) && cityData.length === 0 ? (
          <p className="text-gray-400 text-center">
            No data available for the selected city.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-800 rounded-lg divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Station
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Fuel Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {cityData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 text-left">
                      {item.station}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-left">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-left">
                      {item.fuelType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-left">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadData;
