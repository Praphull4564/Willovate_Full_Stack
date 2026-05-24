import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { useOfferPerformance } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const OfferPerformanceChart: React.FC = () => {
  const { data, isLoading } = useOfferPerformance();

  return (
    <ChartContainer
      title="Offer Performance"
      subtitle="Revenue by individual offer"
      isLoading={isLoading}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => `\u20B9${value / 1000}k`}
          />
          <YAxis
            dataKey="title"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            width={150}
          />
          <Tooltip
            cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            formatter={(value: unknown) => [`\u20B9${Number(value).toLocaleString()}`, 'Revenue']}
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={40}>
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS.categorical[index % ANALYTICS_COLORS.categorical.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
