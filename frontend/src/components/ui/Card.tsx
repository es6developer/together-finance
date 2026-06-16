import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`apple-card ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`apple-card ${className}`}>{children}</div>;
}
