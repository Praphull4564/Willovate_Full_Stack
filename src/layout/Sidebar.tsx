import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight
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

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="hidden md:flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 relative z-20"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 text-slate-500 hover:text-primary transition-colors z-30 shadow-sm"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className={cn("flex items-center h-20 px-6", collapsed ? "justify-center px-0" : "")}>
        <div className="p-2 bg-primary/10 rounded-xl">
          <CalendarRange size={24} className="text-primary" />
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="ml-3 font-bold text-xl tracking-tight text-slate-900 dark:text-white truncate"
          >
            SmartOffer
          </motion.span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-xl transition-all duration-200 group',
                collapsed ? 'justify-center p-3' : 'px-4 py-3',
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50'
              )
            }
            title={collapsed ? item.name : undefined}
          >
            <item.icon size={20} className={cn("shrink-0")} />
            {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center rounded-xl transition-all duration-200',
              collapsed ? 'justify-center p-3' : 'px-4 py-3',
              isActive 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            )
          }
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={20} className="shrink-0" />
          {!collapsed && <span className="ml-3 truncate">Settings</span>}
        </NavLink>
        <button
          onClick={logout}
          className={cn(
            'w-full flex items-center rounded-xl transition-all duration-200 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20',
            collapsed ? 'justify-center p-3' : 'px-4 py-3'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="ml-3 truncate">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};
