const express = require('express');
const db = require('../db/database.cjs');

const router = express.Router();

// Endpoint to get all fuel price data and the last update timestamp
router.get('/fuelprices', (req, res) => {
  try {
    // Get the last update timestamp from the database
    const lastUpdate = db.prepare('SELECT timestamp FROM updates WHERE id = 1').get().timestamp;

    // Get the fuel price data from the database
    const rows = db.prepare('SELECT * FROM city_data').all();

    res.json({ lastUpdate, fuelPrices: rows });  // Send both the timestamp and fuel prices as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
