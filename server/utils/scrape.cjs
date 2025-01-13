/*  File name: scrape.cjs
    Desc: This is the scrape file to load data
*/
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const db = require("../db/database.cjs");

let isRunning = false; // Prevent overlapping executions

// Function to scrape city values from the main page
const scrapeCityValues = async () => {
  const url = "https://www.polttoaine.net/";
  try {
    console.log("Scraping city values...");
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const decodedData = iconv.decode(data, "ISO-8859-1");
    const $ = cheerio.load(decodedData);

    const cityValues = [];
    $("select[name='kaupunki'] option").each((_, element) => {
      const cityValue = $(element).attr("value");
      const cityName = $(element).text().trim();

      if (cityValue && cityValue !== "Valitse kaupunki/Tie") {
        const encodedCityUrl = encodeURIComponent(cityValue).replace(
          /%20/g,
          "_"
        );
        cityValues.push({
          cityName,
          cityUrl: `https://www.polttoaine.net/${encodedCityUrl}`,
        });
      }
    });

    console.log("Scraped city values successfully.");
    return cityValues;
  } catch (error) {
    console.error("Error scraping city values:", error.message);
    return [];
  }
};

// Function to scrape data for a specific city
const scrapeCityData = async (cityUrl) => {
  try {
    console.log(`Scraping data for city: ${cityUrl}`);
    const { data } = await axios.get(cityUrl, { responseType: "arraybuffer" });
    const decodedData = iconv.decode(data, "ISO-8859-1");
    const $ = cheerio.load(decodedData);

    const cityData = [];
    $("table tbody tr").each((_, element) => {
      const station = $(element).find("td:nth-child(1)").text().trim();
      const date = $(element).find("td:nth-child(2)").text().trim();
      const fuelType = $(element).find("td:nth-child(4)").text().trim();
      const price = $(element).find("td:nth-child(5)").text().trim();

      if (station && date && fuelType && price) {
        cityData.push({ station, date, fuelType, price });
      }
    });

    console.log(`Scraped data for city: ${cityData.length} entries.`);
    return cityData;
  } catch (error) {
    console.error(`Error scraping city data (${cityUrl}):`, error.message);
    return [];
  }
};

// Function to update the database
const updateCityData = async () => {
  if (isRunning) {
    console.log("Update already in progress. Skipping this run.");
    return;
  }

  isRunning = true;
  console.log(`Starting updateCityData at ${new Date().toISOString()}`);

  try {
    // Clear old data
    console.log("Clearing old data...");
    db.exec("DELETE FROM city_data");

    // Scrape all city values
    const cityValues = await scrapeCityValues();

    const insertStmt = db.prepare(`
      INSERT INTO city_data (cityName, station, date, fuelType, price)
      VALUES (@cityName, @station, @date, @fuelType, @price)
    `);

    for (const { cityName, cityUrl } of cityValues) {
      const cityData = await scrapeCityData(cityUrl);

      for (const data of cityData) {
        insertStmt.run({
          cityName,
          station: data.station,
          date: data.date,
          fuelType: data.fuelType,
          price: data.price,
        });
      }
    }

    // Update the timestamp
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Helsinki",
    });
    db.prepare("UPDATE updates SET timestamp = ? WHERE id = 1").run(timestamp);

    console.log("Database updated successfully:", timestamp);
  } catch (error) {
    console.error("Error updating city data:", error.message);
  } finally {
    isRunning = false;
    console.log("Finished updateCityData at", new Date().toISOString());
  }
};

// Use setTimeout instead of setInterval for better control
const scheduleUpdate = () => {
  setTimeout(async () => {
    await updateCityData();
    scheduleUpdate(); // Re-schedule after the current run completes
  }, 60 * 60 * 1000); // 1 hour
};

// Start the update loop
scheduleUpdate();
