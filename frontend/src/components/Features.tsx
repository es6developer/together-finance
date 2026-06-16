import { motion } from 'framer-motion';

const features = [
  {
    title: 'Shared Couple Space',
    description:
      'Invite your partner and manage household finances together in one place. See everything from one dashboard.',
    visual: (
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            Y
          </div>
          <span className="text-xs font-medium text-gray-500">You</span>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-gray-300">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            P
          </div>
          <span className="text-xs font-medium text-gray-500">Partner</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Shared Expense Tracking',
    description:
      'Track expenses from both partners and get a complete picture of household spending. Every transaction, together.',
    visual: (
      <div className="space-y-3 w-full max-w-xs mx-auto">
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-sm text-gray-700">Groceries</span>
          </div>
          <span className="text-sm font-medium text-gray-900">-$84.50</span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-700">Utilities</span>
          </div>
          <span className="text-sm font-medium text-gray-900">-$210.00</span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-sm text-gray-700">Dining Out</span>
          </div>
          <span className="text-sm font-medium text-gray-900">-$62.30</span>
        </div>
        <div className="flex items-center justify-between bg-primary-50 rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-primary-700">Total This Week</span>
          <span className="text-sm font-bold text-primary-600">-$356.80</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Goal-Based Saving',
    description:
      'Save together for a home, vacation, emergency fund, or any life milestone. Watch your progress grow as a team.',
    visual: (
      <div className="w-full max-w-xs mx-auto space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Dream Home</span>
            <span className="text-gray-400">44%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
              style={{ width: '44%' }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Europe Trip</span>
            <span className="text-gray-400">52%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary-500 to-secondary-400"
              style={{ width: '52%' }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Emergency Fund</span>
            <span className="text-gray-400">60%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
              style={{ width: '60%' }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Smart Expense Splitting',
    description:
      'Split expenses with friends and family effortlessly. Create shareable payment links and track who paid what.',
    visual: (
      <div className="flex items-center justify-center gap-4">
        <div className="bg-gray-50 rounded-2xl px-5 py-4 text-center">
          <div className="text-xl font-bold text-primary-600">$42.50</div>
          <div className="text-xs text-gray-400 mt-0.5">You paid</div>
        </div>
        <svg
          className="w-6 h-6 text-gray-300 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        <div className="bg-secondary-50 rounded-2xl px-5 py-4 text-center">
          <div className="text-xl font-bold text-secondary-600">$21.25</div>
          <div className="text-xs text-gray-400 mt-0.5">Each owes</div>
        </div>
      </div>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-28 md:py-40 bg-white relative overflow-hidden">
      <div className="absolute top-[-8%] left-[-4%] w-[600px] h-[600px] bg-gradient-to-br from-primary-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-secondary-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="apple-chip mb-5 inline-block">Features</span>
          <h2 className="section-heading mb-5">
            Everything you need,{' '}
            <span className="gradient-text">together</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Built from the ground up for couples and families who want to take control of their financial life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              className="apple-card p-8 md:p-10 h-full"
            >
              <div className="flex flex-col h-full">
                <div className="mb-8">{feature.visual}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
