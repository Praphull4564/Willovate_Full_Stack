import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { calculateTimeLeft } from '../../utils/countdown';
import type { TimeLeft } from '../../utils/countdown';

interface CountdownTimerProps {
  endDate: string;
  className?: string;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, className = '', compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.isExpired) {
    return (
      <div className={`flex items-center space-x-1.5 text-rose-500 font-medium ${className}`}>
        <Clock size={compact ? 14 : 16} />
        <span className={compact ? 'text-xs' : 'text-sm'}>Offer Expired</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center space-x-1.5 text-amber-500 font-medium ${className}`}>
        <Clock size={14} />
        <span className="text-xs">
          {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg shadow-inner">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1 font-medium tracking-wider">Days</span>
      </div>
      <span className="text-slate-400 font-bold text-lg -mt-4">:</span>
      
      <div className="flex flex-col items-center">
        <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg shadow-inner">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1 font-medium tracking-wider">Hrs</span>
      </div>
      <span className="text-slate-400 font-bold text-lg -mt-4">:</span>
      
      <div className="flex flex-col items-center">
        <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg shadow-inner">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1 font-medium tracking-wider">Mins</span>
      </div>
      <span className="text-slate-400 font-bold text-lg -mt-4">:</span>
      
      <div className="flex flex-col items-center">
        <div className="bg-slate-100 dark:bg-slate-800 text-rose-500 dark:text-rose-400 font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg shadow-inner">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1 font-medium tracking-wider">Secs</span>
      </div>
    </div>
  );
};
