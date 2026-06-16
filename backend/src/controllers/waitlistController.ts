import { Request, Response } from 'express';
import { createEntry, findByEmail, getStats } from '../models/waitlist';

export async function submit(req: Request, res: Response) {
  try {
    const { name, email, relationship_type, biggest_challenge, beta_tester_interest } = req.body;

    const existing = await findByEmail(email.trim());
    if (existing) {
      return res.status(409).json({ error: 'This email is already on the waitlist.' });
    }

    await createEntry({ name, email, relationship_type, biggest_challenge, beta_tester_interest });

    return res.status(201).json({ message: 'Successfully joined the waitlist!' });
  } catch (error) {
    console.error('Error submitting waitlist entry:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

export async function getStatsHandler(req: Request, res: Response) {
  try {
    const stats = await getStats();
    return res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
