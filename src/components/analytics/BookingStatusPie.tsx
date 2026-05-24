import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { useBookingStatusBreakdown } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const BookingStatusPie: React.FC = () => {
  const { data, isLoading } = useBookingStatusBreakdown();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return ANALYTICS_COLORS.success;
      case 'Completed': return ANALYTICS_COLORS.primary;
      case 'Cancelled': return ANALYTICS_COLORS.danger;
      case 'No Show': return ANALYTICS_COLORS.neutral;
      default: return ANALYTICS_COLORS.secondary;
    }
  };

  return (
    <ChartContainer 
      title="Booking Status Breakdown" 
      isLoading={isLoading}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
            stroke="none"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => [Number(value), 'Bookings']}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
