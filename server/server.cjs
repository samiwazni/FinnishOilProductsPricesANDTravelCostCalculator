const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const iconv = require('iconv-lite'); // Ensure iconv-lite is installed

const app = express();
const PORT = 5000;

app.use(cors());

const scrapeCityValues = async () => {
  try {
    const url = 'https://www.polttoaine.net/'; // Main page URL containing the city dropdown
    const { data } = await axios.get(url, { responseType: 'arraybuffer' }); // Fetch the main page with correct response type
    const decodedData = iconv.decode(data, 'ISO-8859-1'); // Decode data with ISO-8859-1
    const $ = cheerio.load(decodedData); // Load HTML into Cheerio

    const cityValues = [];

    $('select[name="kaupunki"] option').each((index, element) => {
      const cityValue = $(element).attr('value'); // Get the value attribute
      const cityName = $(element).text().trim(); // Get the display text for debugging

      if (cityValue && cityValue !== 'Valitse kaupunki/Tie') { // Exclude the default option
        const encodedCityUrl = encodeURIComponent(cityValue).replace(/%20/g, '_'); // Encode URL correctly
        cityValues.push({
          cityName,
          cityUrl: `https://www.polttoaine.net/${encodedCityUrl}`, // Construct the encoded URL
        });
      }
    });

    return cityValues;
  } catch (error) {
    console.error('Error fetching city values:', error);
    return [];
  }
};

// Function to scrape data from a single city page
const scrapeCityData = async (cityUrl) => {
  try {
    const response = await axios.get(cityUrl, { responseType: 'arraybuffer' });
    const decodedData = iconv.decode(response.data, 'ISO-8859-1'); // Properly decode the response
    const $ = cheerio.load(decodedData);

    const cityData = [];

    const tableExists = $('table tbody tr').length > 0;
    if (!tableExists) {
      console.warn(`No data found for city URL: ${cityUrl}`);
      return [];
    }

    $('table tbody tr').each((index, element) => {
      const station = $(element).find('td:nth-child(1)').text().trim();
      const date = $(element).find('td:nth-child(2)').text().trim();
      const city = $(element).find('td:nth-child(3)').text().trim();
      const fuelType = $(element).find('td:nth-child(4)').text().trim();
      const price = $(element).find('td:nth-child(5)').text().trim();

      if (station && date && city && fuelType && price) {
        cityData.push({ station, date, city, fuelType, price });
      }
    });

    return cityData;
  } catch (error) {
    console.error(`Error fetching data for city: ${cityUrl}`, error.message);
    return [];
  }
};

// Endpoint to scrape all city data
app.get('/api/scrape', async (req, res) => {
  try {
    const cityValues = await scrapeCityValues(); // Get list of city URLs

    const allCityData = [];

    const fetchCityDataPromises = cityValues.map(async (city) => {
      const cityData = await scrapeCityData(city.cityUrl); // Scrape data for each city
      if (cityData.length > 0) { // Only add data if it's not empty
        allCityData.push({
          cityName: city.cityName, // Ensure this is decoded correctly
          data: cityData,
        });
      } else {
        console.log(`Skipping city ${city.cityName} due to lack of data.`);
      }
    });

    await Promise.all(fetchCityDataPromises); // Execute all requests

    res.json(allCityData); // Send combined data as JSON
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
