import express from 'express';
import { eventRoutes } from './routes/eventRoutes';
import { errorHandler } from './middleware/errorHandler';
import cors from "cors"
const app = express();



app.use(cors({
  origin: 'http://localhost:5000/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));
app.use(cors())

app.use(express.json());

app.use('/api/events', eventRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;