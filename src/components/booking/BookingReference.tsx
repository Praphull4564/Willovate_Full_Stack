import React from 'react';

// This file is obsolete as BookingReference is integrated inside BookingSuccessCard, but kept if needed independently
export const BookingReference: React.FC<{ referenceId: string }> = ({ referenceId }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-1">Booking Reference</p>
      <div className="inline-block bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-xl text-2xl font-mono font-bold tracking-wider text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
        {referenceId}
      </div>
    </div>
  );
};
