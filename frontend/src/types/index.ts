export interface WaitlistFormData {
  name: string;
  email: string;
  relationship_type: string;
  biggest_challenge: string;
  beta_tester_interest: string;
}

export interface WaitlistEntry {
  id: number;
  name: string;
  email: string;
  relationship_type: string;
  biggest_challenge: string;
  beta_tester_interest: string;
  created_at: string;
}

export interface WaitlistStats {
  total: number;
  conversion_rate: number;
  most_selected_challenge: string;
  beta_tester_percentage: number;
}

export interface PaginatedResponse {
  entries: WaitlistEntry[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminLogin {
  username: string;
  password: string;
}
