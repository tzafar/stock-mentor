import * as dotenv from 'dotenv';
dotenv.config();
import './db';
import redisClient from './redisClient';
import { createApp } from './app';

createApp(redisClient).listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
