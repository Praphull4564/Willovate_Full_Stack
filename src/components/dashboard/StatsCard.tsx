import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../ui/Loader';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, icon, delay = 0 }) => {
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {title}
              </p>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                {value}
              </h4>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl dark:bg-primary/20">
              {icon}
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2">
            <div
              className={cn(
                'flex items-center text-xs font-medium px-2 py-1 rounded-md',
                isPositive 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
              )}
            >
              {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {Math.abs(trend)}%
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
