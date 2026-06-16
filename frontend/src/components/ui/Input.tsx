interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl px-4 py-3 border transition-all outline-none
          ${
            error
              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
          }
          placeholder:text-gray-400 text-gray-900 bg-white`}
      />
      {error && <p className="text-sm text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
