import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingDetails } from '../hooks/useBooking';
import { BookingSuccessCard } from '../components/booking/BookingSuccessCard';
import { Confetti } from '../components/ui/Confetti';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { booking, isLoading, isError } = useBookingDetails(bookingId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-lg w-full">
          <EmptyState
            icon={AlertCircle}
            title="Booking Not Found"
            description="We couldn't retrieve your booking details. The link might be invalid or expired."
            actionLabel="Return Home"
            onAction={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <Confetti fire={true} />
      <div className="max-w-2xl mx-auto mb-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft size={18} className="mr-2" />
          Back to Offers
        </Button>
      </div>

      <BookingSuccessCard booking={booking} />
    </div>
  );
};
