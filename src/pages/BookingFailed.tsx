import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookingErrorCard } from '../components/booking/BookingErrorCard';

interface LocationState {
  error?: string;
  offerId?: string;
}

export const BookingFailed: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <BookingErrorCard 
          error={state?.error || "We couldn't process your booking at this time. Please try again."}
          offerId={state?.offerId}
        />
      </div>
    </div>
  );
};
