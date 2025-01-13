/*  File name: cityValuesScraper.cjs
    Desc: This is the city values scrape file
*/
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const scrapeCityValues = async () => {
  try {
    const url = "https://www.polttoaine.net/";
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const decodedData = iconv.decode(data, "ISO-8859-1");
    const $ = cheerio.load(decodedData);

    const cityValues = [];
    $('select[name="kaupunki"] option').each((index, element) => {
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

    return cityValues;
  } catch (error) {
    console.error("Error fetching city values:", error.message);
    return [];
  }
};

module.exports = { scrapeCityValues };
