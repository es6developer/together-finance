import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'px-8 py-4 text-base',
  md: 'px-6 py-3 text-sm',
  sm: 'px-4 py-2 text-xs',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  href,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClass = variant === 'primary'
    ? 'text-white bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300 hover:scale-[1.02]'
    : variant === 'secondary'
    ? 'text-white bg-gradient-to-br from-secondary-500 to-secondary-600 shadow-md hover:scale-[1.02]'
    : variant === 'outline'
    ? 'border-2 border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300'
    : 'text-primary-600 hover:bg-primary-50';

  const classes = `${baseStyles} ${variantClass} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={classes} whileTap={{ scale: 0.98 }}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
