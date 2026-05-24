import React from 'react';
import { SearchBar } from './SearchBar';
import { CATEGORIES } from '../../constants/categories';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-[100px]" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-rose-400/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Discover Premium <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Local Experiences
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10">
          Book exclusive promotional slots for top-rated restaurants, spas, gyms, and entertainment venues before they run out!
        </p>

        <div className="max-w-3xl mx-auto mb-12">
          <SearchBar standalone={true} className="shadow-xl shadow-indigo-500/5" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {CATEGORIES.slice(0, 6).map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all duration-200 group"
              >
                <Icon size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
