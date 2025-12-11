import React, { useState, useCallback, useMemo } from 'react';
import { CalculationMode, CalculationResult, Country } from './types';
import TabSelector from './components/TabSelector';
import InputField from './components/InputField';
import CalculationButton from './components/CalculationButton';
import ResultDisplay from './components/ResultDisplay';
import CountrySelector from './components/CountrySelector';
import { Calculator, AlertTriangle } from 'lucide-react';

const countries: Country[] = [
  { code: 'SA', name: 'المملكة العربية السعودية', currency: 'SAR', vatRate: 15 },
  { code: 'AE', name: 'الإمارات العربية المتحدة', currency: 'AED', vatRate: 5 },
  { code: 'EG', name: 'مصر', currency: 'EGP', vatRate: 14 },
  { code: 'OM', name: 'عُمان', currency: 'OMR', vatRate: 5 },
  { code: 'BH', name: 'البحرين', currency: 'BHD', vatRate: 10 },
  { code: 'QA', name: 'قطر', currency: 'QAR', vatRate: 0 },
  { code: 'KW', name: 'الكويت', currency: 'KWD', vatRate: 0 },
];

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculationMode>(CalculationMode.ADD);
  const [priceStr, setPriceStr] = useState<string>('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('SA');
  
  const selectedCountry = useMemo(() => 
    countries.find(c => c.code === selectedCountryCode) || countries[0], 
    [selectedCountryCode]
  );
  
  const [vatRateStr, setVatRateStr] = useState<string>(selectedCountry.vatRate.toString());
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    const price = parseFloat(priceStr);
    const vatRate = parseFloat(vatRateStr);

    if (isNaN(price) || price <= 0 || isNaN(vatRate) || vatRate < 0) {
      setError('الرجاء إدخال أرقام صالحة وموجبة للسعر ونسبة الضريبة.');
      setResult(null);
      return;
    }

    setError(null);
    let calculatedResult: CalculationResult;

    if (mode === CalculationMode.ADD) {
      const net = price;
      const vat = net * (vatRate / 100);
      const gross = net + vat;
      calculatedResult = { net, vat, gross };
    } else { // CalculationMode.SUBTRACT
      const gross = price;
      const net = gross / (1 + vatRate / 100);
      const vat = gross - net;
      calculatedResult = { net, vat, gross };
    }
    setResult(calculatedResult);
  }, [priceStr, vatRateStr, mode]);
  
  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    setResult(null);
    setError(null);
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = event.target.value;
    const newCountry = countries.find(c => c.code === newCountryCode);
    if (newCountry) {
      setSelectedCountryCode(newCountryCode);
      setVatRateStr(newCountry.vatRate.toString());
      setResult(null);
      setError(null);
    }
  };

  const priceLabel = mode === CalculationMode.ADD ? `السعر الصافي (${selectedCountry.currency})` : `السعر الإجمالي (${selectedCountry.currency})`;

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex items-center justify-center p-4">
      <main className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <header className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
                <Calculator className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">حاسبة الضريبة</h1>
                <p className="text-slate-500 dark:text-slate-400">أضف أو أزل الضريبة بسرعة.</p>
              </div>
            </header>

            <div className="space-y-6">
              <TabSelector
                activeMode={mode}
                onModeChange={handleModeChange}
              />
               <CountrySelector
                countries={countries}
                selectedCountryCode={selectedCountryCode}
                onChange={handleCountryChange}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label={priceLabel}
                  id="price"
                  value={priceStr}
                  onChange={(e) => setPriceStr(e.target.value)}
                  placeholder="مثال: 100"
                  type="number"
                />
                <InputField
                  label="نسبة الضريبة (%)"
                  id="vat-rate"
                  value={vatRateStr}
                  onChange={(e) => setVatRateStr(e.target.value)}
                  placeholder="مثال: 15"
                  type="number"
                />
              </div>

              <CalculationButton onClick={handleCalculate} />

              {error && (
                <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
          
          {result && (
            <ResultDisplay result={result} currency={selectedCountry.currency} />
          )}
        </div>
        <footer className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
          <p>مصممة للوضوح وسهولة الاستخدام.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
