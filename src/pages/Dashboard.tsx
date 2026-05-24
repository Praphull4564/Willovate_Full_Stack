import React from 'react';
import { 
  Tags, 
  CheckCircle2, 
  CalendarDays, 
  Users, 
  Briefcase, 
  Percent,
  Clock,
  TrendingUp
} from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { BookingChart } from '../components/dashboard/BookingChart';
import { RecentBookings } from '../components/dashboard/RecentBookings';
import { QuickActions } from '../components/dashboard/QuickActions';
import { useDashboardSummary } from '../hooks/useAnalytics';

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  const dashboardStats = stats || {
    totalOffers: 0, activeOffers: 0, totalBookings: 0, todayBookings: 0,
    totalCapacity: 0, bookedSeats: 0, availableSeats: 0, conversionRate: 0,
    trends: { totalOffers: 0, activeOffers: 0, totalBookings: 0, todayBookings: 0, totalCapacity: 0, bookedSeats: 0, availableSeats: 0, conversionRate: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Offers"
          value={dashboardStats.totalOffers}
          trend={dashboardStats.trends?.totalOffers || 0}
          icon={<Tags />}
          delay={0.1}
        />
        <StatsCard
          title="Active Offers"
          value={dashboardStats.activeOffers}
          trend={dashboardStats.trends?.activeOffers || 0}
          icon={<CheckCircle2 />}
          delay={0.2}
        />
        <StatsCard
          title="Total Bookings"
          value={dashboardStats.totalBookings}
          trend={dashboardStats.trends?.totalBookings || 0}
          icon={<CalendarDays />}
          delay={0.3}
        />
        <StatsCard
          title="Today's Bookings"
          value={dashboardStats.todayBookings}
          trend={dashboardStats.trends?.todayBookings || 0}
          icon={<Clock />}
          delay={0.4}
        />
        <StatsCard
          title="Total Capacity"
          value={dashboardStats.totalCapacity}
          trend={dashboardStats.trends?.totalCapacity || 0}
          icon={<Briefcase />}
          delay={0.5}
        />
        <StatsCard
          title="Booked Seats"
          value={dashboardStats.bookedSeats}
          trend={dashboardStats.trends?.bookedSeats || 0}
          icon={<Users />}
          delay={0.6}
        />
        <StatsCard
          title="Available Seats"
          value={dashboardStats.availableSeats}
          trend={dashboardStats.trends?.availableSeats || 0}
          icon={<TrendingUp />}
          delay={0.7}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${dashboardStats.conversionRate}%`}
          trend={dashboardStats.trends?.conversionRate || 0}
          icon={<Percent />}
          delay={0.8}
        />
      </div>

      {/* Charts & Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BookingChart />
        <QuickActions />
      </div>

      {/* Recent Bookings Table */}
      <div className="grid grid-cols-1">
        <RecentBookings />
      </div>
    </div>
  );
};
