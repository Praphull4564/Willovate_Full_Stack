import React from 'react';
import { useActivityFeed } from '../../hooks/useAnalytics';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { CalendarCheck, Tag, XCircle, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const ActivityFeed: React.FC = () => {
  const { data, isLoading } = useActivityFeed();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-[400px] animate-pulse">
        <div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded mb-8"></div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking_created': return <CalendarCheck size={16} className="text-emerald-500" />;
      case 'offer_activated': return <Tag size={16} className="text-indigo-500" />;
      case 'booking_cancelled': return <XCircle size={16} className="text-rose-500" />;
      case 'slot_filled': return <Users size={16} className="text-amber-500" />;
      default: return <CalendarCheck size={16} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'booking_created': return 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30';
      case 'offer_activated': return 'bg-indigo-100 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30';
      case 'booking_cancelled': return 'bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30';
      case 'slot_filled': return 'bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/30';
      default: return 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-[400px] flex flex-col shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 shrink-0">Recent Activity</h3>
      
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 dark:before:from-slate-800 dark:before:via-slate-800 before:to-transparent">
        {data?.map((activity) => (
          <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className={twMerge(
              "flex items-center justify-center w-8 h-8 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
              getBgColor(activity.type)
            )}>
              {getIcon(activity.type)}
            </div>
            
            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{activity.title}</h4>
                <time className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">
                  {(() => {
                    try {
                      return activity.timestamp ? formatDistanceToNow(parseISO(activity.timestamp)) + ' ago' : 'Just now';
                    } catch (e) {
                      return 'Recently';
                    }
                  })()}
                </time>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
