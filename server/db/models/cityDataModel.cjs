const db = require('../database.cjs'); 

// Clear data for a city
const clearCityData = (cityName) => {
  const stmt = db.prepare('DELETE FROM city_data WHERE cityName = ?');
  stmt.run(cityName);
};

// Save data for a city
const saveCityData = (cityName, cityData) => {
  const insert = db.prepare(`
    INSERT INTO city_data (cityName, station, date, fuelType, price)
    VALUES (@cityName, @station, @date, @fuelType, @price)
  `);

  const insertMany = db.transaction((data) => {
    for (const entry of data) {
      insert.run({
        cityName,
        ...entry,
      });
    }
  });

  clearCityData(cityName);
  insertMany(cityData);
};

// Fetch data for a city
const getCityData = (cityName) => {
  const stmt = db.prepare('SELECT * FROM city_data WHERE cityName = ?');
  return stmt.all(cityName);
};

module.exports = { saveCityData, getCityData, clearCityData };
