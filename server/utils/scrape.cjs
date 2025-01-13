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
      const date = $(element).find("td:nth-child(2)").text().trim();
      const fuel95E10 = $(element).find("td:nth-child(3)").text().trim();
      const fuel98E = $(element).find("td:nth-child(4)").text().trim();
      const diesel = $(element).find("td:nth-child(5)").text().trim();

      if (date && (fuel95E10 || fuel98E || diesel)) {
        cityData.push({ date, fuel95E10, fuel98E, diesel });
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
      INSERT INTO city_data (cityName, date, fuel95E10, fuel98E, diesel)
      VALUES (@cityName, @date, @fuel95E10, @fuel98E, @diesel)
    `);

    for (const { cityName, cityUrl } of cityValues) {
      const cityData = await scrapeCityData(cityUrl);

      for (const data of cityData) {
        insertStmt.run({
          cityName,
          date: data.date,
          fuel95E10: data.fuel95E10 || "N/A",
          fuel98E: data.fuel98E || "N/A",
          diesel: data.diesel || "N/A",
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
