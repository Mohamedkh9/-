import React from 'react';
import { CalculationMode } from '../types';
import { Plus, Minus } from 'lucide-react';

interface TabSelectorProps {
  activeMode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeMode, onModeChange }) => {
  const tabs = [
    { mode: CalculationMode.ADD, label: 'إضافة الضريبة', icon: Plus },
    { mode: CalculationMode.SUBTRACT, label: 'طرح الضريبة', icon: Minus },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          onClick={() => onModeChange(tab.mode)}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-800 ${
            activeMode === tab.mode
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-600/50'
          }`}
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
