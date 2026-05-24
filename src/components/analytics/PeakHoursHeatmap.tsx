import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { usePeakHours } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell
} from 'recharts';

export const PeakHoursHeatmap: React.FC = () => {
  const { data, isLoading } = usePeakHours();
  
  // Create a mapping for numeric Y axis because Recharts scatter needs numbers for Z-axis sizing logic ideally, 
  // or we can just use categorical axes. We will use categorical for X and Y.
  
  return (
    <ChartContainer 
      title="Peak Booking Hours" 
      subtitle="Intensity of bookings by day and time"
      isLoading={isLoading}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
          <XAxis 
            type="category" 
            dataKey="hour" 
            name="Hour" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            type="category" 
            dataKey="day" 
            name="Day" 
            reversed
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <ZAxis type="number" dataKey="intensity" range={[100, 1000]} name="Intensity" />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            formatter={(value: any, name: any, props: any) => {
              if (name === 'Intensity') return [props.payload.bookingsCount, 'Bookings'];
              return [value, name];
            }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Scatter data={data} shape="circle">
            {data?.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={ANALYTICS_COLORS.primary} 
                fillOpacity={0.2 + (entry.intensity / 100) * 0.8} 
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
