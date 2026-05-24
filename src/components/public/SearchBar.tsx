import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  initialValue?: string;
  onSearch?: (value: string) => void;
  className?: string;
  standalone?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  initialValue = '', 
  onSearch, 
  className = '',
  standalone = false
}) => {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  // Debounce logic if onSearch is provided
  useEffect(() => {
    if (!onSearch) return;
    const handler = setTimeout(() => {
      onSearch(value);
    }, 400);
    return () => clearTimeout(handler);
  }, [value, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (standalone && value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl leading-5 bg-transparent placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm hover:shadow-md"
        placeholder="Search for restaurants, spas, gyms..."
      />
      {standalone && (
        <button
          type="submit"
          className="absolute inset-y-1.5 right-1.5 bg-primary hover:bg-primary-dark text-white px-4 rounded-xl text-sm font-medium transition-colors"
        >
          Search
        </button>
      )}
    </form>
  );
};
