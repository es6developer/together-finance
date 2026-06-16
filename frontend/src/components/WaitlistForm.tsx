import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitToWaitlist } from '../utils/api';

const relationshipOptions = [
  { value: '', label: 'Select your relationship type' },
  { value: 'dating', label: 'Dating' },
  { value: 'engaged', label: 'Engaged' },
  { value: 'married', label: 'Married' },
  { value: 'family', label: 'Family' },
  { value: 'other', label: 'Other' },
];

const challengeOptions = [
  { value: '', label: 'Select your biggest challenge' },
  { value: 'tracking_shared_expenses', label: 'Tracking shared expenses' },
  { value: 'saving_for_goals', label: 'Saving for goals' },
  { value: 'budgeting', label: 'Budgeting' },
  { value: 'financial_transparency', label: 'Financial transparency' },
  { value: 'splitting_bills', label: 'Splitting bills' },
  { value: 'managing_debt', label: 'Managing debt' },
  { value: 'other', label: 'Other' },
];

const betaOptions = [
  { value: '', label: 'Are you interested in beta testing?' },
  { value: 'yes', label: 'Yes, I want early access!' },
  { value: 'no', label: 'No, just the waitlist' },
];

const ib = 'w-full rounded-2xl px-4 py-3.5 border border-gray-200 bg-white text-[15px] outline-none transition-all duration-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 placeholder:text-gray-400';
const ibErr = 'w-full rounded-2xl px-4 py-3.5 border border-red-300 bg-white text-[15px] outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 placeholder:text-gray-400';

export default function WaitlistForm() {
  const [form, setForm] = useState({ name: '', email: '', relationship_type: '', biggest_challenge: '', beta_tester_interest: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.relationship_type) e.relationship_type = 'Select a relationship type';
    if (!form.biggest_challenge) e.biggest_challenge = 'Select your biggest challenge';
    if (!form.beta_tester_interest) e.beta_tester_interest = 'Select an option';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setServerError('');
    try {
      await submitToWaitlist(form);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const upd = (f: string, v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: '' }));
  };

  const sc = (f: string, v: string) => `${f === v ? 'text-gray-900' : 'text-gray-400'}`;

  return (
    <section id="waitlist" className="py-28 md:py-40 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-primary-50/50 via-secondary-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="apple-chip mb-5 inline-block">Get Early Access</span>
          <h2 className="section-heading mb-4">
            Be among the first to try{' '}
            <span className="gradient-text">Together Finance</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Reserve your spot today and get early access when we launch.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="apple-card p-12 md:p-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">You&apos;re on the list!</h3>
              <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
                You&apos;re officially on the waitlist. We&apos;ll keep you updated as we get closer to launch.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="apple-card p-8 md:p-12 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                  <input value={form.name} onChange={e => upd('name', e.target.value)} placeholder="e.g. Alex Johnson" className={errors.name ? ibErr : ib} />
                  {errors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="e.g. alex@example.com" className={errors.email ? ibErr : ib} />
                  {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Relationship Type</label>
                  <div className="relative">
                    <select value={form.relationship_type} onChange={e => upd('relationship_type', e.target.value)} className={`${errors.relationship_type ? ibErr : ib} appearance-none ${sc(form.relationship_type, '')}`}>
                      {relationshipOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.relationship_type && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.relationship_type}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Biggest Challenge</label>
                  <div className="relative">
                    <select value={form.biggest_challenge} onChange={e => upd('biggest_challenge', e.target.value)} className={`${errors.biggest_challenge ? ibErr : ib} appearance-none ${sc(form.biggest_challenge, '')}`}>
                      {challengeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.biggest_challenge && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.biggest_challenge}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Beta Testing Interest</label>
                <div className="relative">
                  <select value={form.beta_tester_interest} onChange={e => upd('beta_tester_interest', e.target.value)} className={`${errors.beta_tester_interest ? ibErr : ib} appearance-none ${sc(form.beta_tester_interest, '')}`}>
                    {betaOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.beta_tester_interest && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.beta_tester_interest}</p>}
              </div>

              {serverError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium">
                  {serverError}
                </motion.div>
              )}

              <button type="submit" disabled={status === 'loading'} className="apple-button-primary w-full px-8 py-4 text-[15px]">
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Reserve My Spot'}
              </button>

              <p className="text-center text-xs text-gray-400">No spam, ever. We&apos;ll only email you about your waitlist status.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
