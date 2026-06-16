import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';
import { findAll } from '../models/waitlist';

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const users = await query<any[]>('SELECT * FROM admin_users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || '',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

export async function getSubmissions(req: Request, res: Response) {
  try {
    const { relationship_type, biggest_challenge, search, page, limit } = req.query;

    const result = await findAll(
      {
        relationship_type: relationship_type as string | undefined,
        biggest_challenge: biggest_challenge as string | undefined,
      },
      search as string | undefined,
      Math.max(1, Number(page) || 1),
      Math.min(100, Math.max(1, Number(limit) || 10))
    );

    return res.json(result);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

export async function exportCSV(req: Request, res: Response) {
  try {
    const entries = await findAll({}, undefined, 1, 999999);

    const headers = 'Name,Email,Relationship Type,Biggest Challenge,Beta Tester Interest,Created At';
    const rows = entries.entries.map(entry => {
      const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
      return [
        escape(entry.name),
        escape(entry.email),
        escape(entry.relationship_type),
        escape(entry.biggest_challenge),
        escape(entry.beta_tester_interest),
        escape(entry.created_at ? new Date(entry.created_at).toISOString() : ''),
      ].join(',');
    });

    const csv = [headers, ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="waitlist-submissions.csv"');
    return res.send(csv);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
