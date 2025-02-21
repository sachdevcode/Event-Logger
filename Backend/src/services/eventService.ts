import WebSocket from 'ws';
import { UserEvent } from '../types/event';
import { saveEvent } from './redisService';

const subscribers: Map<string, WebSocket[]> = new Map();

export const logEvent = async (event: UserEvent): Promise<void> => {
 
  await saveEvent(event);
  
  notifySubscribers(event);
};

export const subscribeToEvents = (userId: string, ws: WebSocket): void => {
  if (!subscribers.has(userId)) {
    subscribers.set(userId, []);
  }
  subscribers.get(userId)?.push(ws);
};

export const unsubscribe = (userId: string, ws: WebSocket): void => {
  const subs = subscribers.get(userId) || [];
  subscribers.set(userId, subs.filter(socket => socket !== ws));
};

const notifySubscribers = (event: UserEvent): void => {
  const subs = subscribers.get(event.userId) || [];
  subs.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(event));
    }
  });
};