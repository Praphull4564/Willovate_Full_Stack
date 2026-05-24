import React, { useEffect } from 'react';
import { OfferPerformanceChart } from '../components/analytics/OfferPerformanceChart';
import { BookingStatusPie } from '../components/analytics/BookingStatusPie';
import { UtilizationChart } from '../components/analytics/UtilizationChart';
import { PeakHoursHeatmap } from '../components/analytics/PeakHoursHeatmap';
import { ConversionFunnel } from '../components/analytics/ConversionFunnel';
import { BusinessInsightsCard } from '../components/analytics/BusinessInsightsCard';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const BusinessInsights: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/analytics">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Business Insights</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Deep dive into conversion metrics and operational efficiency.</p>
          </div>
        </div>
        <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          Export Report
        </Button>
      </div>

      {/* Top Row: AI Insights & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BusinessInsightsCard />
        </div>
        <div className="lg:col-span-2">
          <ConversionFunnel />
        </div>
      </div>

      {/* Middle Row: Offer Performance & Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OfferPerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <UtilizationChart />
        </div>
      </div>

      {/* Bottom Row: Peak Hours & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeakHoursHeatmap />
        <BookingStatusPie />
      </div>

    </div>
  );
};
