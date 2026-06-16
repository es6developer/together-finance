import { motion } from 'framer-motion';
import PhoneMockup from './ui/PhoneMockup';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-white pt-24 md:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.06),transparent_60%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-8 flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp} className="mb-5">
          <span className="apple-chip px-4 py-1.5 text-[11px] font-semibold">Coming Soon</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 max-w-5xl mx-auto leading-[1.05] mb-5"
        >
          Money works better{' '}
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-500">
            together
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-[22px] text-gray-500 max-w-xl mx-auto leading-relaxed mb-10"
        >
          The finance app built for couples and families.
          Track expenses, save for goals, and stay aligned.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <a href="#waitlist" className="apple-button-primary px-7 py-3.5 text-[15px] font-semibold">
            Join the Waitlist
          </a>
          <a href="#features" className="apple-button-secondary px-7 py-3.5 text-[15px] font-semibold">
            See How It Works &darr;
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 text-sm text-gray-400 mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Join early users helping shape the future of family finance.
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12"
      >
        <div className="flex justify-center gap-4 md:gap-8 items-end">
          <div className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[370px] transform translate-y-0">
            <PhoneMockup>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-900 tracking-tight">Dashboard</span>
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 border-2 border-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-4 text-white">
                  <div className="text-[10px] opacity-80 font-medium tracking-wider uppercase">Combined Balance</div>
                  <div className="text-2xl font-bold tracking-tight mt-1">$12,450</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                    <span className="text-[10px] text-green-200 font-medium">+2.4% this month</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Groceries', cat: 'Today', amt: '-$84.50', cls: 'text-red-500' },
                    { name: 'Salary', cat: 'Yesterday', amt: '+$3,200', cls: 'text-green-600' },
                    { name: 'Mortgage', cat: 'Due in 5 days', amt: '-$1,800', cls: 'text-red-500' },
                  ].map((i) => (
                    <div key={i.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <div>
                          <div className="text-[11px] font-medium text-gray-900">{i.name}</div>
                          <div className="text-[9px] text-gray-400">{i.cat}</div>
                        </div>
                      </div>
                      <span className={`text-[11px] font-semibold ${i.cls}`}>{i.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneMockup>
          </div>

          <div className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[370px] hidden sm:block translate-y-10">
            <PhoneMockup>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-900 tracking-tight">Savings Goals</span>
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  {[
                    { n: 'Dream Home', cur: 35, tgt: 80, bar: 'from-primary-500 to-primary-600' },
                    { n: 'Europe Trip', cur: 4.2, tgt: 8, bar: 'from-secondary-500 to-secondary-400' },
                    { n: 'Emergency Fund', cur: 6, tgt: 10, bar: 'from-purple-500 to-purple-400' },
                  ].map((g) => (
                    <div key={g.n}>
                      <div className="flex justify-between text-[10px] mb-1.5">
                        <span className="font-medium text-gray-900">{g.n}</span>
                        <span className="text-gray-400">${g.cur}k / ${g.tgt}k</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${g.bar}`} style={{ width: `${(g.cur / g.tgt) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-4">
                  <div className="text-[10px] font-medium text-secondary-700">Combined Savings</div>
                  <div className="text-xl font-bold text-secondary-600 tracking-tight">$45,200</div>
                  <div className="text-[10px] text-secondary-500 mt-0.5">32% ahead of your goal</div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </motion.div>

      <div className="h-12" />
    </section>
  );
}
