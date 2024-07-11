import express, { Request, Response } from 'express'
import { fetchStocksDataFor } from './stocksService';
const router = express.Router();

router.get('/stocks', async (req: Request, res: Response) => {
    const ticker: string = req.query.ticker as string;
    console.log('The ticker is', req.query)
    res.status(200).send(await fetchStocksDataFor(ticker));
})

export default router;