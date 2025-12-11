import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { ClipboardCopy, Check } from 'lucide-react';

interface ResultDisplayProps {
  result: CalculationResult;
  currency: string;
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('ar', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

const ResultRow: React.FC<{ label: string; value: number; currency: string; isHighlight?: boolean }> = ({ label, value, currency, isHighlight = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value.toFixed(2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className={`flex justify-between items-center py-4 ${isHighlight ? 'text-lg font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
      <span>{label}</span>
      <div className="flex items-center gap-3">
        <span className={isHighlight ? 'text-indigo-600 dark:text-indigo-400' : ''}>{formatCurrency(value, currency)}</span>
        <button
          onClick={handleCopy}
          aria-label={`نسخ ${label}`}
          title={`نسخ ${label}`}
          className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <ClipboardCopy className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, currency }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 border-t border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-center text-slate-800 dark:text-slate-200">تفاصيل الحساب</h2>
      <div className="space-y-2">
        <ResultRow label="السعر الصافي" value={result.net} currency={currency} />
        <div className="border-b border-dashed border-slate-300 dark:border-slate-600"></div>
        <ResultRow label="مبلغ الضريبة" value={result.vat} currency={currency} />
        <div className="border-b border-slate-300 dark:border-slate-600"></div>
        <ResultRow label="السعر الإجمالي" value={result.gross} isHighlight={true} currency={currency} />
      </div>
    </div>
  );
};

export default ResultDisplay;
