import { query } from '../config/database';

export async function recordVisit(sessionId: string, page: string): Promise<void> {
  await query(
    'INSERT INTO page_visits (session_id, page) VALUES (?, ?)',
    [sessionId, page]
  );
}

export async function getTotalVisits(): Promise<number> {
  const result = await query<any[]>('SELECT COUNT(*) as total FROM page_visits');
  return result[0].total;
}

export async function getUniqueVisitors(): Promise<number> {
  const result = await query<any[]>('SELECT COUNT(DISTINCT session_id) as total FROM page_visits');
  return result[0].total;
}
