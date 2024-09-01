import React, { useState, useEffect } from 'react';

const LoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/scrape'); // Fetch from backend API
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-300">
      <h1 className="text-2xl font-semibold mb-6 text-white">Scraped Fuel Data</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        data.length === 0 ? (
          <p className="text-gray-400">No data available.</p>
        ) : (
          data.map((cityData, cityIndex) => (
            <div key={cityIndex} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">{cityData.cityName}</h2> {/* Display city name */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-800 rounded-lg divide-y divide-gray-800">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asema</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Päivämäärä</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">95E10</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">98E</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">B7</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {cityData.data.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.station}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.fuelType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default LoadData;
