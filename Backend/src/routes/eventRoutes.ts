import express from 'express';
import { getRecentEvents } from '../services/redisService';
import { asyncWrapper } from '../utils/asyncWrapper';

const router = express.Router();


router.get('/recent/:userId', asyncWrapper(async (req, res) => {
  const events = await getRecentEvents(req.params.userId);
  res.json(events);
}));

export const eventRoutes = router;