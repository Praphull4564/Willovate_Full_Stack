import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Sparkles, UserCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col font-sans transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-indigo-500/25 transition-all">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              SmartBooking
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              leftIcon={<UserCircle size={18} />}
              onClick={() => navigate('/login')}
              className="hidden sm:flex"
            >
              Business Login
            </Button>
            <button 
              className="sm:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              onClick={() => navigate('/login')}
            >
              <UserCircle size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-1.5 rounded-lg">
                  <Sparkles className="text-white" size={16} />
                </div>
                <span className="text-lg font-bold">SmartBooking</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                Discover and book exclusive promotional slots and premium offers from local businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Customers</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/" className="hover:text-primary transition-colors">Browse Offers</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">How it works</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Businesses</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/login" className="hover:text-primary transition-colors">Partner Login</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">List your business</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <p>© 2026 SmartBooking. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
