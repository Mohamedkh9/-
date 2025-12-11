import React from 'react';
import { Country } from '../types';

interface CountrySelectorProps {
  countries: Country[];
  selectedCountryCode: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, selectedCountryCode, onChange }) => {
  return (
    <div>
      <label htmlFor="country-selector" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        الدولة
      </label>
      <div className="relative">
        <select
          id="country-selector"
          value={selectedCountryCode}
          onChange={onChange}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition duration-150 ease-in-out appearance-none"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
