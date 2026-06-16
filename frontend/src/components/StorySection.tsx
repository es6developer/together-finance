import { motion } from 'framer-motion';

const stats = [
  { value: '10K+', label: 'Couples onboard' },
  { value: '95%', label: 'Satisfaction rate' },
  { value: '$2M+', label: 'Saved together' },
  { value: '4.9\u2605', label: 'App rating' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function StorySection() {
  return (
    <section className="py-28 md:py-40 bg-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] bg-gradient-to-br from-primary-50/50 via-primary-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-secondary-50/40 via-secondary-50/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="apple-chip mb-5 inline-block">Testimonials</span>
          <h2 className="section-heading mb-5">
            More than budgeting.{' '}
            <span className="gradient-text">Financial teamwork.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            See how couples are transforming their financial lives together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="apple-card p-12 md:p-16 text-center relative">
            <svg
              className="w-12 h-12 text-primary-200 mx-auto mb-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>

            <blockquote className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-light italic mb-10 max-w-3xl mx-auto">
              &ldquo;We used to avoid talking about money. Now we check our shared
              dashboard every morning with our coffee. It&apos;s completely
              transformed how we plan our future.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-base shadow-md">
                SM
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-lg">Sarah &amp; Mike</div>
                <div className="text-sm text-gray-400">Together Finance users</div>
              </div>
            </div>

            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              className="apple-card px-4 py-6 text-center"
            >
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
