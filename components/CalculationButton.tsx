import React, { ButtonHTMLAttributes } from 'react';
import { ArrowLeft } from 'lucide-react';

interface CalculationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const CalculationButton: React.FC<CalculationButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-all duration-200 transform hover:scale-105"
    >
      احسب
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

export default CalculationButton;
