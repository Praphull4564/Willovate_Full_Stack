import React from 'react';
import { ChartContainer } from '../ui/ChartContainer';
import { useRevenueTrends } from '../../hooks/useAnalytics';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import { formatDateAxis, CustomTooltipFormatter } from '../../utils/chartFormatters';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const RevenueChart: React.FC = () => {
  const { data, isLoading } = useRevenueTrends();

  return (
    <ChartContainer
      title="Revenue Overview"
      subtitle="Daily revenue over the last 30 days"
      isLoading={isLoading}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={ANALYTICS_COLORS.gradient.primary[0]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={ANALYTICS_COLORS.gradient.primary[1]} stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `\u20B9${value / 1000}k`}
          />
          <Tooltip
            formatter={CustomTooltipFormatter}
            labelFormatter={(label: unknown) => formatDateAxis(label)}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={ANALYTICS_COLORS.primary}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
