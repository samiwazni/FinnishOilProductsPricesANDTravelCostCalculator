/*  File name: server.cjs
    Desc: This is the server main file
*/
// Import necessary modules
const express = require("express");
const scrapeRoutes = require("./routes/scrapeRoutes.cjs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api", scrapeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
