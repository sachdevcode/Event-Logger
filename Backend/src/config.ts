import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();


const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.connect().catch((err) => console.error('Redis Connection Error:', err));


export const config = {
  port: process.env.PORT || 4000,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    client: redisClient, 
  },
};