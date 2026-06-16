interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl px-4 py-3 border transition-all outline-none appearance-none bg-white
            ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
            }
            ${!value ? 'text-gray-400' : 'text-gray-900'}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
