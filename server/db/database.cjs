/*  File name: database.cjs
    Desc: This is the file to create database tables
*/

const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.resolve("server/db", "fuelprices.db");
const db = new Database(dbPath, { verbose: console.log });

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS city_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cityName TEXT,
    date TEXT,
    fuel95E10 TEXT,
    fuel98E TEXT,
    diesel TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT
  )
`);

// Initialize the updates table with a null timestamp if it's empty
const checkUpdate = db.prepare("SELECT COUNT(*) FROM updates").get();
if (checkUpdate["COUNT(*)"] === 0) {
  db.prepare("INSERT INTO updates (timestamp) VALUES (?)").run([null]);
}

module.exports = db;
