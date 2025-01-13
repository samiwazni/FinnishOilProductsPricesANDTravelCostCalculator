/*  File name: server.cjs
    Desc: This is the server main file
*/
// Import necessary modules
const express = require("express");
const db = require("./db/database.cjs");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoint to fetch city data and latest update timestamp
app.get("/api/fuel-data", (req, res) => {
  try {
    const cityData = db.prepare("SELECT * FROM city_data").all();
    const updateRow = db.prepare("SELECT timestamp FROM updates LIMIT 1").get();

    const response = {
      lastUpdate: updateRow ? updateRow.timestamp : "No updates available",
      fuelPrices: cityData,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /api/fuel-data:", error.message);
    res.status(500).json({ message: "Failed to fetch fuel data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
