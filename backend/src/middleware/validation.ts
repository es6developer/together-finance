import { Request, Response, NextFunction } from 'express';

const VALID_RELATIONSHIP_TYPES = ['dating', 'engaged', 'married', 'family', 'other'] as const;
const VALID_CHALLENGES = [
  'tracking_shared_expenses',
  'saving_for_goals',
  'budgeting',
  'financial_transparency',
  'splitting_bills',
  'managing_debt',
  'other',
] as const;
const VALID_BETA_INTEREST = ['yes', 'no'] as const;

export function validateWaitlistInput(req: Request, res: Response, next: NextFunction) {
  const errors: Record<string, string> = {};
  const { name, email, relationship_type, biggest_challenge, beta_tester_interest } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    errors.name = 'Name is required and must be between 2 and 100 characters.';
  }

  if (!email || typeof email !== 'string') {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Email must be a valid email address.';
  }

  if (!relationship_type || !(VALID_RELATIONSHIP_TYPES as readonly string[]).includes(relationship_type)) {
    errors.relationship_type = `Relationship type must be one of: ${VALID_RELATIONSHIP_TYPES.join(', ')}.`;
  }

  if (!biggest_challenge || !(VALID_CHALLENGES as readonly string[]).includes(biggest_challenge)) {
    errors.biggest_challenge = `Biggest challenge must be one of: ${VALID_CHALLENGES.join(', ')}.`;
  }

  if (!beta_tester_interest || !(VALID_BETA_INTEREST as readonly string[]).includes(beta_tester_interest)) {
    errors.beta_tester_interest = 'Beta tester interest must be either "yes" or "no".';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}
