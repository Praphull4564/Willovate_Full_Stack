import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CalendarRange, GaugeCircle, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AnalyticsCards } from '../components/analytics/AnalyticsCards';
import { RevenueChart } from '../components/analytics/RevenueChart';
import { BookingTrendChart } from '../components/analytics/BookingTrendChart';
import { ActivityFeed } from '../components/analytics/ActivityFeed';
import { BookingStatusPie } from '../components/analytics/BookingStatusPie';
import { UtilizationChart } from '../components/analytics/UtilizationChart';
import { OfferPerformanceChart } from '../components/analytics/OfferPerformanceChart';
import { PeakHoursHeatmap } from '../components/analytics/PeakHoursHeatmap';
import { ConversionFunnel } from '../components/analytics/ConversionFunnel';
import { BusinessInsightsCard } from '../components/analytics/BusinessInsightsCard';
import { useDashboardSummary } from '../hooks/useAnalytics';
import { formatNumber, formatPercent } from '../utils/chartFormatters';

export const AnalyticsDashboard: React.FC = () => {
  const { data: summary } = useDashboardSummary();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="relative overflow-hidden rounded-[28px] border border-slate-200 dark:border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(135deg,_#ffffff_0%,_#f8fafc_35%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(135deg,_#0f172a_0%,_#111827_40%,_#172554_100%)] p-6 md:p-8 shadow-sm">
        <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center rounded-full border border-sky-200/70 dark:border-sky-400/20 bg-white/70 dark:bg-slate-900/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  Analytics Command Center
                </div>
                <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Analytics Overview
                </h1>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 dark:text-slate-300">
                  Follow offer demand, booking momentum, peak hours, and conversion patterns from one reliable dashboard.
                </p>
              </div>
              <Link to="/analytics/insights" className="shrink-0">
                <Button variant="outline" className="bg-white/80 dark:bg-slate-900/60 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                  <Sparkles size={18} className="mr-2" />
                  View Smart Insights
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-[0.14em]">
                  <TrendingUp size={16} className="text-emerald-500" />
                  Booking Velocity
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(summary?.totalBookings ?? 0)}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">confirmed and completed movements this cycle</div>
              </div>
              <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-[0.14em]">
                  <GaugeCircle size={16} className="text-amber-500" />
                  Utilization
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{formatPercent(summary?.conversionRate ?? 0)}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">capacity-to-booking efficiency across active slots</div>
              </div>
              <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-[0.14em]">
                  <CalendarRange size={16} className="text-sky-500" />
                  Today
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(summary?.todayBookings ?? 0)}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">new bookings registered in the latest daily window</div>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <BusinessInsightsCard />
          </div>
        </div>
      </section>

      <AnalyticsCards />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)] gap-6">
        <div className="min-w-0 space-y-6">
          <RevenueChart />
          <BookingTrendChart />
        </div>
        <div className="min-w-0 space-y-6">
          <ActivityFeed />
          <BookingStatusPie />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="min-w-0">
          <UtilizationChart />
        </div>
        <div className="min-w-0">
          <ConversionFunnel />
        </div>
        <div className="min-w-0">
          <OfferPerformanceChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="min-w-0">
          <PeakHoursHeatmap />
        </div>
      </div>
    </div>
  );
};
