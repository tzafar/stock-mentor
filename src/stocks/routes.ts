import express, { Request, Response } from 'express';
import { fetchStocksDataFor } from './stocksService';
import redisClient from '../redisClient';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/stocks', async (req: Request, res: Response) => {
  const ticker: string = req.query.ticker as string;
  const stocksLastYearData = await fetchStocksDataFor(ticker);
  redisClient.setex('/stocks/ticker', 43200, JSON.stringify(stocksLastYearData));

  return res.status(StatusCodes.OK).send(stocksLastYearData);
});

export default router;
