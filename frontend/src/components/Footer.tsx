import { motion } from 'framer-motion';

const year = new Date().getFullYear();

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Roadmap', href: '#coming-soon' },
  { label: 'Join Waitlist', href: '#waitlist' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
];

const socialLinks = [
  { label: 'Twitter', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Footer() {
  return (
    <footer className="bg-[#fafafe] border-t border-gray-100/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 tracking-tight">Together Finance</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              The finance app built for couples and families. Manage money together, track shared
              expenses, save for goals, and stay aligned on your financial future.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400"
        >
          <p>&copy; {year} Together Finance. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-gray-600 transition-colors duration-200 text-sm"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
