/*  File name: scrape.cjs
    Desc: Main scraping file
*/

const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const db = require("../db/database.cjs");
const { scrapeCityValues } = require("./cityValuesScraper.cjs"); // Import the scrapeCityValues module

let isRunning = false; // Prevent overlapping executions

const scrapeCityData = async (cityUrl, cityName) => {
  try {
    console.log(`Scraping data for city: ${cityName} (${cityUrl})`);
    const { data } = await axios.get(cityUrl, { responseType: "arraybuffer" });
    const decodedData = iconv.decode(data, "ISO-8859-1");
    const $ = cheerio.load(decodedData);

    const cityData = [];

    $("table tbody tr").each((_, element) => {
      const isAverageRow = $(element).find(".Keskihinnat").length > 0;

      if (isAverageRow) {
        cityData.push({
          cityName,
          station: null, // Average prices row
          date: null,
          fuel95E10: $(element).find("td:nth-child(3)").text().trim(),
          fuel98E: $(element).find("td:nth-child(4)").text().trim(),
          diesel: $(element).find("td:nth-child(5)").text().trim(),
          isAverage: true,
        });
      } else {
        const station = $(element).find("td:nth-child(1)").text().trim();
        const date = $(element).find("td:nth-child(2)").text().trim();
        const fuel95E10 = $(element).find("td:nth-child(3)").text().trim();
        const fuel98E = $(element).find("td:nth-child(4)").text().trim();
        const diesel = $(element).find("td:nth-child(5)").text().trim();

        if (station && date) {
          cityData.push({
            cityName,
            station,
            date,
            fuel95E10: fuel95E10 === "-" ? null : fuel95E10,
            fuel98E: fuel98E === "-" ? null : fuel98E,
            diesel: diesel === "-" ? null : diesel,
            isAverage: false,
          });
        }
      }
    });

    console.log(
      `Scraped ${cityData.length} entries for city: ${cityName} (including averages).`
    );
    return cityData;
  } catch (error) {
    console.error(`Error scraping city data (${cityUrl}):`, error.message);
    return [];
  }
};

const updateCityData = async () => {
  if (isRunning) {
    console.log("Update already in progress. Skipping this run.");
    return;
  }

  isRunning = true;
  console.log(`Starting updateCityData at ${new Date().toISOString()}`);

  try {
    console.log("Clearing old data...");
    db.exec("DELETE FROM city_data");

    const cityValues = await scrapeCityValues(); // Use the imported function

    const insertStmt = db.prepare(`
      INSERT INTO city_data (cityName, station, date, fuel95E10, fuel98E, diesel)
      VALUES (@cityName, @station, @date, @fuel95E10, @fuel98E, @diesel)
    `);

    for (const { cityName, cityUrl } of cityValues) {
      const cityData = await scrapeCityData(cityUrl, cityName);

      for (const data of cityData) {
        insertStmt.run({
          cityName: data.cityName,
          station: data.station,
          date: data.date,
          fuel95E10: data.fuel95E10,
          fuel98E: data.fuel98E,
          diesel: data.diesel,
        });
      }
    }

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

const scheduleUpdate = () => {
  setTimeout(async () => {
    await updateCityData();
    scheduleUpdate(); // Re-schedule after the current run completes
  }, 60 * 60 * 1000); // 1 hour interval
};

scheduleUpdate(); // Start the scraping loop
