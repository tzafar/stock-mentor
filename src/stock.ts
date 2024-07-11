import yahooFinance from 'yahoo-finance2';
import fs from 'fs';

const SYMBOL = 'ABNB';
const ONE_YEAR_AGO = new Date();
ONE_YEAR_AGO.setFullYear(ONE_YEAR_AGO.getFullYear() - 1);

// Fetch data from Yahoo Finance API
async function fetchStockData() {
  try {
    const queryOptions = { period1: ONE_YEAR_AGO.toISOString().split('T')[0], interval: '1d' };
    //@ts-ignore
    const result = await yahooFinance.historical(SYMBOL, queryOptions);

    //@ts-ignore
    const stockData = result.map(day => ({
      date: day.date.toISOString().split('T')[0],
      open: day.open,
      close: day.close,
      difference: day.close - day.open
    }));

    // Display result in tabular form
    console.table(stockData);

    // Optionally save result to a JSON file
    fs.writeFileSync('abnb_stock_data.json', JSON.stringify(stockData, null, 2));
    console.log('Stock data saved to abnb_stock_data.json');
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
}

fetchStockData();
