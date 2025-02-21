import { UserEvent } from '../types/event';
import { config } from '../config';

const { client } = config.redis;

export const saveEvent = async (event: UserEvent): Promise<void> => {
  const key = `events:${event.userId}`;
  await client.lPush(key, JSON.stringify(event));
  await client.lTrim(key, 0, 9); 
};

export const getRecentEvents = async (userId: string): Promise<UserEvent[]> => {
  const key = `events:${userId}`;
  const events = await client.lRange(key, 0, 9);
  return events.map(event => JSON.parse(event));
};