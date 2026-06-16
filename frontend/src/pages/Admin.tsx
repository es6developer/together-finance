import { useState, useEffect, FormEvent } from 'react';
import { adminLogin, getAdminSubmissions, exportCSV } from '../utils/api';
import type { PaginatedResponse, WaitlistEntry } from '../types';

const RELATIONSHIP_LABELS: Record<string, string> = {
  dating: 'Dating',
  engaged: 'Engaged',
  married: 'Married',
  family: 'Family',
  other: 'Other',
};

const CHALLENGE_LABELS: Record<string, string> = {
  tracking_shared_expenses: 'Tracking shared expenses',
  saving_for_goals: 'Saving for goals',
  budgeting: 'Budgeting',
  financial_transparency: 'Financial transparency',
  splitting_bills: 'Splitting bills',
  managing_debt: 'Managing debt',
  other: 'Other',
};

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await adminLogin(username, password);
      onLogin(data.token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Together Finance Dashboard</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState('');
  const [challengeFilter, setChallengeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getAdminSubmissions(token, {
        search: search || undefined,
        relationship_type: relationshipFilter || undefined,
        biggest_challenge: challengeFilter || undefined,
        page,
        limit: 20,
      });
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => exportCSV(token)}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Export CSV
            </button>
            <button
              onClick={onLogout}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{data.total}</div>
              <div className="text-sm text-gray-500">Total Signups</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-primary-600">{data.total}</div>
              <div className="text-sm text-gray-500">Page Visitors</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-secondary-600">--</div>
              <div className="text-sm text-gray-500">Conversion Rate</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600">--</div>
              <div className="text-sm text-gray-500">Beta Interest</div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
              />
              <select
                value={relationshipFilter}
                onChange={(e) => {
                  setRelationshipFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              >
                <option value="">All Relationships</option>
                {Object.entries(RELATIONSHIP_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <select
                value={challengeFilter}
                onChange={(e) => {
                  setChallengeFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              >
                <option value="">All Challenges</option>
                {Object.entries(CHALLENGE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-6 py-2 gradient-primary text-white font-medium rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">{error}</div>
          ) : data && data.entries.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No submissions yet.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Relationship</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Challenge</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Beta</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.entries.map((entry: WaitlistEntry) => (
                      <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">{entry.name}</td>
                        <td className="px-4 py-3 text-gray-600">{entry.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium">
                            {RELATIONSHIP_LABELS[entry.relationship_type] || entry.relationship_type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                          {CHALLENGE_LABELS[entry.biggest_challenge] || entry.biggest_challenge}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            entry.beta_tester_interest === 'yes'
                              ? 'bg-secondary-50 text-secondary-700'
                              : 'bg-gray-50 text-gray-500'
                          }`}>
                            {entry.beta_tester_interest === 'yes' ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('admin_token')
  );

  const handleLogin = (newToken: string) => {
    localStorage.setItem('admin_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}
