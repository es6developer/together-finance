import { query } from '../config/database';

export interface WaitlistEntry {
  id?: number;
  name: string;
  email: string;
  relationship_type: string;
  biggest_challenge: string;
  beta_tester_interest: string;
  created_at?: Date;
}

export interface WaitlistFilters {
  relationship_type?: string;
  biggest_challenge?: string;
}

export interface PaginatedResult<T> {
  entries: T[];
  total: number;
}

export interface WaitlistStats {
  total: number;
  conversion_rate: number;
  most_selected_challenge: { challenge: string; count: number } | null;
  beta_tester_interest_percentage: number;
}

export async function createEntry(data: WaitlistEntry): Promise<void> {
  await query(
    `INSERT INTO waitlist (name, email, relationship_type, biggest_challenge, beta_tester_interest) VALUES (?, ?, ?, ?, ?)`,
    [data.name.trim(), data.email.trim(), data.relationship_type, data.biggest_challenge, data.beta_tester_interest]
  );
}

export async function findByEmail(email: string): Promise<WaitlistEntry | null> {
  const entries = await query<WaitlistEntry[]>('SELECT * FROM waitlist WHERE email = ?', [email.trim()]);
  return entries.length > 0 ? entries[0] : null;
}

export async function findAll(
  filters: WaitlistFilters,
  search?: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResult<WaitlistEntry>> {
  const conditions: string[] = [];
  const params: any[] = [];

  if (filters.relationship_type) {
    conditions.push('relationship_type = ?');
    params.push(filters.relationship_type);
  }

  if (filters.biggest_challenge) {
    conditions.push('biggest_challenge = ?');
    params.push(filters.biggest_challenge);
  }

  if (search) {
    conditions.push('(name LIKE ? OR email LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await query<any[]>(`SELECT COUNT(*) as total FROM waitlist ${whereClause}`, params);
  const total = countResult[0].total;

  const offset = (page - 1) * limit;
  const entries = await query<WaitlistEntry[]>(
    `SELECT * FROM waitlist ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return { entries, total };
}

export async function getStats(): Promise<WaitlistStats> {
  const totalResult = await query<any[]>('SELECT COUNT(*) as total FROM waitlist');
  const total = totalResult[0].total;

  const visitsResult = await query<any[]>('SELECT COUNT(*) as total FROM page_visits');
  const pageVisits = visitsResult[0].total;

  const conversionRate = pageVisits > 0 ? (total / pageVisits) * 100 : 0;

  const challengeResult = await query<any[]>(
    'SELECT biggest_challenge as challenge, COUNT(*) as count FROM waitlist GROUP BY biggest_challenge ORDER BY count DESC LIMIT 1'
  );
  const mostSelectedChallenge = challengeResult.length > 0 ? challengeResult[0] : null;

  const betaYesResult = await query<any[]>(
    "SELECT COUNT(*) as count FROM waitlist WHERE beta_tester_interest = 'yes'"
  );
  const betaYes = betaYesResult[0].count;
  const betaInterestPercentage = total > 0 ? (betaYes / total) * 100 : 0;

  return {
    total,
    conversion_rate: Math.round(conversionRate * 100) / 100,
    most_selected_challenge: mostSelectedChallenge,
    beta_tester_interest_percentage: Math.round(betaInterestPercentage * 100) / 100,
  };
}
