const API_URL = 'http://localhost:5000/api/fuelprices'; // URL for your backend API

// Function to fetch fuel prices and the last update timestamp from the backend
export const fetchFuelData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (response.ok) {
      return data;  // Return data which contains 'lastUpdate' and 'fuelPrices'
    } else {
      throw new Error('Error fetching fuel data');
    }
  } catch (error) {
    console.error('Failed to fetch fuel data:', error);
    throw error;
  }
};