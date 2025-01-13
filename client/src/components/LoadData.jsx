import React, { useState, useEffect } from "react";
import { fetchFuelData } from "../api";

const LoadData = () => {
  const [data, setData] = useState([]); // Full dataset
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(""); // Selected city
  const [cityData, setCityData] = useState([]); // Data for the selected city
  const [lastUpdate, setLastUpdate] = useState(""); // Last update timestamp

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const result = await fetchFuelData(); // Fetch data from API

      if (result && result.fuelPrices) {
        const fuelPrices = result.fuelPrices || [];
        const updateTime = result.lastUpdate || "Unknown";

        setData(fuelPrices);
        setLastUpdate(updateTime);

        if (fuelPrices.length > 0) {
          setSelectedCity(fuelPrices[0].cityName); // Default to the first city
        }
      } else {
        throw new Error("Invalid data structure from API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data for the selected city
  const filterCityData = () => {
    if (selectedCity) {
      const filteredData = data.filter(
        (item) => item.cityName === selectedCity
      );
      setCityData(filteredData);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filter city data when the selected city or dataset changes
  useEffect(() => {
    filterCityData();
  }, [selectedCity, data]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg text-gray-300">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6 text-white text-left">
          Live Finnish Oil Products Prices
        </h1>

        {/* Latest Update */}
        <p className="text-gray-400 text-left mb-1">
          <strong>Last update:</strong> {lastUpdate || "Loading..."}
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
            {data.length > 0 ? (
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
        ) : cityData.length === 0 ? (
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
                    95E10
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    98E
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Diesel
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
                      {item.fuel95E10}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-left">
                      {item.fuel98E}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-left">
                      {item.diesel}
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
