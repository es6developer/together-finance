interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="rounded-[3rem] border-4 border-gray-800 bg-gray-900 p-2.5 shadow-2xl">
        <div className="relative rounded-[2.25rem] overflow-hidden bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-700" />
          </div>
          <div className="pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
