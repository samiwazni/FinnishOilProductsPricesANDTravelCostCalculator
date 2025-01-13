const API_URL = "http://localhost:5000/api/fuel-data";

export const fetchFuelData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (response.ok && data && data.fuelPrices) {
      console.log("Fetched Data:", data); // Debug log
      return data; // Return { lastUpdate, fuelPrices }
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Failed to fetch fuel data:", error);
    throw error;
  }
};
