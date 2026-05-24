import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { useRevenueTrends } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import { formatDateAxis } from '../../utils/chartFormatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const BookingTrendChart: React.FC = () => {
  const { data, isLoading } = useRevenueTrends();

  return (
    <ChartContainer 
      title="Booking Volume" 
      subtitle="Daily bookings over the last 30 days"
      isLoading={isLoading}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDateAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip 
            labelFormatter={(label: any) => formatDateAxis(label)}
            cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar 
            dataKey="bookings" 
            fill={ANALYTICS_COLORS.secondary} 
            radius={[4, 4, 0, 0]} 
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
