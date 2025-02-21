WebSocket Event Logger
A real-time event logging system using WebSocket and Redis for storing and retrieving events. Built with Express.js and TypeScript.

Features
Real-Time Event Logging: Log events in real-time using WebSocket.

Redis Storage: Store and retrieve events using Redis.

REST API: Fetch recent events via a REST endpoint.

CORS Support: Securely allow cross-origin requests from your frontend.

## **Prerequisites
Node.js (v16 or higher)

Redis (running locally)

## **Installation
## **Clone the repository:

git clone https://github.com/sachdevcode/Event-Logger.git
cd websocket-event-logger/backend

## Install dependencies:

## Dependencies

## Production Dependencies

 `express` → Web framework for Node.js.
 `ws` → WebSocket library.
 `redis` → Redis client for Node.js.
 `cors` → Middleware for enabling CORS.
 `dotenv` → Load environment variables from a `.env` file.

## Development Dependencies

 `typescript` → TypeScript compiler.
 `ts-node-dev` → Development tool for running TypeScript files.
 `@types/express`, `@types/ws`, `@types/node` → TypeScript type definitions.


yarn install
Create a .env file in the root directory and add the following environment variables:

## env

PORT=4000
REDIS_HOST=localhost
REDIS_PORT=6379

Running the Project
Development Mode
Run the project in development mode

yarn run dev

## Production Mode

## Build the project:

yarn run build

## Start the server:

yarn start

## Project Structure

src/
├── app.ts                # Main Express application
├── config.ts             # Configuration settings
├── server.ts             # HTTP and WebSocket server setup
├── routes/               # REST API routes
│   └── eventRoutes.ts    # Event-related routes
├── services/             # Business logic
│   ├── eventService.ts   # Event service
│   └── redisService.ts   # Redis service
├── types/                # TypeScript types/interfaces
│   └── event.ts          # Event-related types
├── middleware/           # Custom middleware
│   └── errorHandler.ts   # Global error handler
└── utils/                # Utility functions
    └── asyncWrapper.ts   # Async error handler wrapper
    
## API Endpoints
## WebSocket
URL: ws://localhost:4000

## Actions:

## Subscribe to Events: 

Payload:

{
  "type": "subscribe",
  "userId": "123"
}

Expected Response
{
  "type": "subscribed",
  "userId": "123"
}

Functionality: Subscribes the WebSocket connection to events for the specified userId.

## Log an Event:

Payload:

{
  "type": "event",
  "event": {
    "userId": "123",
    "eventType": "login"
  }
}
Functionality: Logs an event for the specified userId and broadcasts it to all subscribers.

## REST API
## Fetch Recent Events
URL: GET /api/events/recent/:userId

Example: GET http://localhost:4000/api/events/recent/123

Functionality: Fetches the 10 most recent events for the specified userId from Redis.

Expected Response:

[
  {
    "userId": "123",
    "eventType": "login",
    "timestamp": 1234567890
  },
  {
    "userId": "123",
    "eventType": "logout",
    "timestamp": 1234567891
  }
]

## Frontend Integration

The frontend interacts with the backend using the following files:

change directory to client and then start the local server to start serving local files index.html and its related files

index.html
Contains the UI for connecting to the WebSocket, sending events, and fetching recent events.





