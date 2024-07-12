import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import healthRoutes from './health/routes';
import userRoutes from './users/routes';
import booksRouter from './books/routes';
import { Redis } from 'ioredis';
import { cacheMiddleware, invalidateCache } from './cache';
import stocksRouter from './stocks/routes';
var cors = require('cors');

export function createApp(client: Redis) {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api', cacheMiddleware(client), healthRoutes);
  app.use('/api', cacheMiddleware(client), userRoutes);
  app.use('/api', cacheMiddleware(client), booksRouter);
  app.use('/api', cacheMiddleware(client), stocksRouter);
  app.delete('/cache', invalidateCache(client));

  const errorHandler = function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.status(500).send({ error: err.message });
  };

  app.use(errorHandler);
  return app;
}
