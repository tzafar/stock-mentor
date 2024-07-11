import yahooFinance from 'yahoo-finance2';

const ONE_YEAR_AGO = new Date();
ONE_YEAR_AGO.setFullYear(ONE_YEAR_AGO.getFullYear() - 1);

// Fetch data from Yahoo Finance API
export async function fetchStocksDataFor(ticker: string) {
  try {
    const queryOptions = { period1: ONE_YEAR_AGO.toISOString().split('T')[0], interval: '1d' };
    //@ts-ignore
    const result = await yahooFinance.historical(ticker, queryOptions);

    //@ts-ignore
    const stockData = result.map(day => ({
      date: day.date.toISOString().split('T')[0],
      open: day.open,
      close: day.close,
      difference: day.close - day.open
    }));

    return stockData;

    
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }

}

