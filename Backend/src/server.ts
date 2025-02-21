import { createServer } from 'http';
import WebSocket from 'ws';
import { config } from './config';
import app from './app';
import { subscribeToEvents, unsubscribe, logEvent } from './services/eventService';
import { UserEvent } from './types/event';



const server = createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  let userId: string | null = null;

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'subscribe') {
        userId = data.userId;
        if (userId) {
          subscribeToEvents(userId, ws);
          ws.send(JSON.stringify({ type: 'subscribed', userId }));
        } else {
          ws.send(JSON.stringify({ type: 'error', message: 'Invalid userId' }));
        }
        return;
      }

      // Handle event logging
      if (data.type === 'event' && data.event) {
        const event: UserEvent = {
          userId: data.event.userId,
          eventType: data.event.eventType,
          timestamp: Date.now(),
        };
        await logEvent(event);
        ws.send(JSON.stringify({ type: 'logged', event }));
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
      ws.send(JSON.stringify({ type: 'error', message: 'Internal server error' }));
    }
  });

  ws.on('close', () => {
    try {
      if (userId) {
        unsubscribe(userId, ws);
      }
    } catch (err) {
      console.error('Error handling WebSocket close:', err);
    }
  });
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});