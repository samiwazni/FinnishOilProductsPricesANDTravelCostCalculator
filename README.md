# Finnish Oil Products Prices and Travel Cost Calculator

This is a **ReactJS/NodeJS** project that dynamically loads live oil product prices from various locations around Finland. The project does not rely on an external API but instead uses a **NodeJS** script to scrape data from [polttoaine.net](https://www.polttoaine.net), a website providing information on fuel prices across Finland. Additionally, the project features a **Fuel Consumption Calculator** that helps users calculate the cost of their trips based on fuel prices and consumption.

## Features

1. **Live Oil Product Prices Table**:
   - Displays current prices of different types of oil products (such as 95E10, 98E, B7, etc.) across various stations in Finland.
   - The data is updated dynamically using a NodeJS scraper, providing real-time information without relying on a third-party API.

2. **Fuel Consumption Calculator**:
   - A tool to calculate the fuel consumption and the estimated cost of a trip.
   - Users can input their vehicle's fuel efficiency, and distance to be travelled, and select the fuel type. The calculator then computes the estimated fuel cost for the trip based on the latest prices fetched by the scraper.
   - Helps users make informed decisions regarding travel costs by providing a detailed breakdown of expenses.

## Technologies Used

- **ReactJS**: Front-end library for building the user interface.
- **NodeJS**: Backend runtime for running the data scraper and serving data to the front end.
- **Express**: A web application framework for NodeJS to handle API requests.
- **Tailwind CSS**: A utility-first CSS framework for styling the user interface.
- **Cheerio**: A Node.js library that implements a subset of jQuery, used for web scraping and parsing HTML.

## Project Structure

- **Frontend**: Built with ReactJS and styled using Tailwind CSS. It provides a user-friendly interface to view oil prices and calculate travel costs.
- **Backend**: Built with NodeJS and Express. The backend contains the scraper script to fetch data from polttoaine.net and serves it via an API to the front end.
- **Scraper**: A custom NodeJS script utilizing Cheerio for scraping data from the web.

## Setup Instructions

Follow these steps to run the project locally:

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) installed on your machine.
- **Git** for cloning the repository.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/samiwazni/FinnishOilProductsPricesANDTravelCostCalculator.git
   cd FinnishOilProductsPricesANDTravelCostCalculator
   npm install -> to install package and any package dependencies
   npm run dev -> This command will run the server and the client at the same time
