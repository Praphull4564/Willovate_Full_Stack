import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { useConversionFunnel } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const ConversionFunnel: React.FC = () => {
  const { data, isLoading } = useConversionFunnel();

  return (
    <ChartContainer 
      title="Booking Funnel" 
      subtitle="Customer journey drop-off rates"
      isLoading={isLoading}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          layout="vertical" 
          margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="stage" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            formatter={(value: any) => [Number(value).toLocaleString(), 'Users']}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={40}>
            {data?.map((_, index) => {
              // Create a gradient-like effect where top of funnel is light and bottom is dark
              const opacity = 1 - (index * 0.2);
              return <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS.secondary} fillOpacity={Math.max(0.4, opacity)} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
