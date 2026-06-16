const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function submitToWaitlist(data: {
  name: string;
  email: string;
  relationship_type: string;
  biggest_challenge: string;
  beta_tester_interest: string;
}) {
  const res = await fetch(`${API_BASE}/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Something went wrong');
  return json;
}

export async function recordVisit(sessionId?: string) {
  const sid =
    sessionId ||
    localStorage.getItem('session_id') ||
    crypto.randomUUID();
  if (!localStorage.getItem('session_id')) {
    localStorage.setItem('session_id', sid);
  }
  await fetch(`${API_BASE}/analytics/visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sid }),
  });
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Login failed');
  return json;
}

export async function getAdminSubmissions(
  token: string,
  params?: {
    relationship_type?: string;
    biggest_challenge?: string;
    search?: string;
    page?: number;
    limit?: number;
  }
) {
  const qs = new URLSearchParams();
  if (params?.relationship_type) qs.set('relationship_type', params.relationship_type);
  if (params?.biggest_challenge) qs.set('biggest_challenge', params.biggest_challenge);
  if (params?.search) qs.set('search', params.search);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.limit) qs.set('limit', String(params.limit));

  const res = await fetch(`${API_BASE}/admin/submissions?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to fetch');
  return json;
}

export async function exportCSV(token: string) {
  const res = await fetch(`${API_BASE}/admin/export`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Export failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'waitlist-export.csv';
  a.click();
  URL.revokeObjectURL(url);
}
