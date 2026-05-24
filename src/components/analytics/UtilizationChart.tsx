import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { useDashboardSummary } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import { calculateCapacityUtilization } from '../../utils/analyticsHelpers';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

export const UtilizationChart: React.FC = () => {
  const { data, isLoading } = useDashboardSummary();

  const utilization = data ? calculateCapacityUtilization(data.bookedSeats, data.totalCapacity) : 0;
  
  const chartData = [
    { name: 'Capacity', value: utilization, fill: ANALYTICS_COLORS.primary }
  ];

  return (
    <ChartContainer 
      title="Capacity Utilization" 
      isLoading={isLoading}
      className="h-[400px]"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="70%" 
            outerRadius="90%" 
            barSize={20} 
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: 'var(--color-slate-100)', opacity: 0.1 }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute flex flex-col items-center justify-center pb-8">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            {utilization}%
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Booked
          </span>
        </div>
      </div>
    </ChartContainer>
  );
};
