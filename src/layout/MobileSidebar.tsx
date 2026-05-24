import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Building2, 
  Tags, 
  CalendarDays, 
  ListChecks, 
  BarChart3, 
  Settings, 
  LogOut,
  CalendarRange,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../components/ui/Loader';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Business Profile', path: '/profile', icon: Building2 },
  { name: 'Offers', path: '/offers', icon: Tags },
  { name: 'Slots', path: '/slots', icon: CalendarDays },
  { name: 'Bookings', path: '/bookings', icon: ListChecks },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <CalendarRange size={24} className="text-primary" />
                </div>
                <span className="ml-3 font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                  SmartOffer
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 font-medium',
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                    )
                  }
                >
                  <item.icon size={22} className="shrink-0" />
                  <span className="ml-4">{item.name}</span>
                </NavLink>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 pb-8">
              <NavLink
                to="/settings"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 font-medium',
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )
                }
              >
                <Settings size={22} className="shrink-0" />
                <span className="ml-4">Settings</span>
              </NavLink>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 font-medium"
              >
                <LogOut size={22} className="shrink-0" />
                <span className="ml-4">Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
