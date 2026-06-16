import { Router, Request, Response } from 'express';
import { submit, getStatsHandler } from '../controllers/waitlistController';
import { validateWaitlistInput } from '../middleware/validation';
import { v4 as uuidv4 } from 'uuid';
import { recordVisit } from '../models/analytics';

const router = Router();

router.post('/api/waitlist', validateWaitlistInput, submit);
router.get('/api/waitlist/stats', getStatsHandler);

router.post('/api/analytics/visit', async (req: Request, res: Response) => {
  try {
    const { page, sessionId } = req.body;
    const sid = sessionId || uuidv4();
    await recordVisit(sid, page || '/');
    return res.status(201).json({ message: 'Visit recorded.', sessionId: sid });
  } catch (error) {
    console.error('Error recording visit:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
