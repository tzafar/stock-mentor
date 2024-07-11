import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';

const client = new Redis({
    host: 'localhost',
    port: 6379,
  });

client.on('error', () => {
    console.error('Error from Reids!')
})

export const cacheMiddleware = (client: Redis) => async (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;

    try {
        const data = await client.get(key);
        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    } catch (err) {
        console.error('Redis GET error:', err);
        next();
    }
}

export const invalidateCache = (client: Redis) => async (req: Request, res: Response) => {
    const key = req.query.key as string;

    try {
        const response = await client.del(key);
        if(response === 1){
            res.send({message: `Cache on the key ${key} is cleared`});
        } else {
            res.send({message: `Cache on the key ${key} is not found`});
        }
    } catch (error) {
        
    }
}