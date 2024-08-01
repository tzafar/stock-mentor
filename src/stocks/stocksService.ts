import yahooFinance from 'yahoo-finance2';
import { HistoricalHistoryResult, HistoricalOptions } from 'yahoo-finance2/dist/esm/src/modules/historical';
import { StockRecord, StockRecordType } from './schema';

const ONE_YEAR_AGO = new Date();
ONE_YEAR_AGO.setFullYear(ONE_YEAR_AGO.getFullYear() - 1);

// Fetch data from Yahoo Finance API
export async function fetchStocksDataFor(ticker: string): Promise<StockRecordType> {
  try {
    const queryOptions: HistoricalOptions = {
      period1: ONE_YEAR_AGO.toISOString().split('T')[0],
      interval: '1d',
    };

    const result: HistoricalHistoryResult = await yahooFinance.historical(ticker, queryOptions);

    const stockData = result.map(day => ({
      date: day.date.toISOString().split('T')[0],
      open: day.open,
      close: day.close,
      difference: day.close - day.open,
    }));

    return stockData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error('Somethignn went wrong. Plesae try again later.');
  }
}
