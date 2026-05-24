import React from 'react';
import { useDashboardSummary } from '../../hooks/useAnalytics';
import { generateTrendInsights } from '../../utils/analyticsHelpers';
import { InsightBadge } from '../ui/InsightBadge';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BusinessInsightsCard: React.FC = () => {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading || !data) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 h-[400px] animate-pulse border border-indigo-500/20">
        <div className="h-6 w-48 bg-white/10 rounded mb-8"></div>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-white/5 rounded-2xl p-4">
              <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
              <div className="h-4 w-full bg-white/10 rounded mb-1"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const insights = generateTrendInsights(data.trends);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 h-[400px] flex flex-col overflow-hidden border border-indigo-500/20 shadow-xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="relative flex items-center mb-6 shrink-0">
        <div className="p-2 bg-indigo-500/20 rounded-xl mr-3 border border-indigo-500/30">
          <Sparkles size={20} className="text-indigo-400" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide">Smart Insights</h3>
      </div>

      <div className="relative flex-1 overflow-y-auto pr-2 -mr-2 space-y-4">
        {insights.map(insight => (
          <div key={insight.id} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-4 backdrop-blur-sm group">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-indigo-100">{insight.title}</h4>
              <InsightBadge type={insight.type}>{insight.type === 'positive' ? 'Trending' : insight.type === 'warning' ? 'Alert' : 'Info'}</InsightBadge>
            </div>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">
              {insight.description}
            </p>
            {insight.actionable && (
              <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors cursor-pointer">
                {insight.actionable}
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
