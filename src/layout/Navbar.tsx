import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, Sun, Moon, User as UserIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { NotificationDropdown } from '../components/notifications/NotificationDropdown';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('q') || '').trim();
    if (!query) return;

    if (location.pathname.startsWith('/bookings')) {
      navigate(`/bookings?search=${encodeURIComponent(query)}`);
    } else if (location.pathname.startsWith('/offers')) {
      navigate(`/offers?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="h-20 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <form className="hidden lg:flex relative" onSubmit={handleSearch}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            name="q"
            type="text"
            placeholder="Search bookings, offers..."
            className="w-64 h-10 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all outline-none"
          />
        </form>

        <NotificationDropdown />

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block" />

        <div className="flex items-center space-x-3 cursor-pointer p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full sm:rounded-xl transition-colors">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <UserIcon size={18} />
          </div>
          <div className="hidden sm:block text-sm mr-2">
            <p className="font-medium text-slate-900 dark:text-slate-100 leading-none mb-1">
              {user?.name || 'Admin'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">
              {user?.role || 'Admin'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
