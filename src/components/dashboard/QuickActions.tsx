import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { PlusCircle, CalendarPlus, ListChecks, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const actions = [
  { title: 'Create Offer', path: '/offers/create', icon: PlusCircle, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { title: 'Add Slot', path: '/slots', icon: CalendarPlus, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { title: 'View Bookings', path: '/bookings', icon: ListChecks, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { title: 'Business Settings', path: '/profile', icon: Settings, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
];

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {actions.map((action) => (
            <motion.button
              key={action.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className="flex items-center p-3 space-x-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-slate-900 text-left"
            >
              <div className={`p-2 rounded-lg ${action.bg}`}>
                <action.icon className={action.color} size={20} />
              </div>
              <span className="font-medium text-sm text-slate-700 dark:text-slate-200">
                {action.title}
              </span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
