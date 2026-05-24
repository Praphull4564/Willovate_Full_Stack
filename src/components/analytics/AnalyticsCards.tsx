import React from 'react';
import { AnalyticsCard } from '../ui/AnalyticsCard';
import { useDashboardSummary } from '../../hooks/useAnalytics';
import { formatNumber, formatPercent } from '../../utils/chartFormatters';
import { 
  Package, 
  Activity, 
  CalendarCheck, 
  Clock, 
  Users, 
  UserCheck, 
  UserPlus,
  Percent
} from 'lucide-react';

export const AnalyticsCards: React.FC = () => {
  const { data: summary, isLoading } = useDashboardSummary();

  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <AnalyticsCard key={i} title="Loading..." value="-" icon={<Activity />} isLoading={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <AnalyticsCard
        title="Total Offers"
        value={formatNumber(summary.totalOffers)}
        icon={<Package size={20} />}
      />
      <AnalyticsCard
        title="Active Offers"
        value={formatNumber(summary.activeOffers)}
        icon={<Activity size={20} />}
        trend={summary.trends.activeOffers}
        trendLabel="vs last month"
      />
      <AnalyticsCard
        title="Total Bookings"
        value={formatNumber(summary.totalBookings)}
        icon={<CalendarCheck size={20} />}
        trend={summary.trends.bookings}
        trendLabel="vs last month"
      />
      <AnalyticsCard
        title="Today's Bookings"
        value={formatNumber(summary.todayBookings)}
        icon={<Clock size={20} />}
      />
      <AnalyticsCard
        title="Total Capacity"
        value={formatNumber(summary.totalCapacity)}
        icon={<Users size={20} />}
      />
      <AnalyticsCard
        title="Booked Seats"
        value={formatNumber(summary.bookedSeats)}
        icon={<UserCheck size={20} />}
      />
      <AnalyticsCard
        title="Available Seats"
        value={formatNumber(summary.availableSeats)}
        icon={<UserPlus size={20} />}
      />
      <AnalyticsCard
        title="Conversion Rate"
        value={formatPercent(summary.conversionRate)}
        icon={<Percent size={20} />}
        trend={summary.trends.conversion}
        trendLabel="vs last month"
      />
    </div>
  );
};
