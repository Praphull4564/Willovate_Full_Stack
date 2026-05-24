import React from 'react';
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface BookingErrorCardProps {
  error: string;
  onRetry?: () => void;
  offerId?: string;
}

export const BookingErrorCard: React.FC<BookingErrorCardProps> = ({ error, onRetry, offerId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl max-w-md mx-auto text-center p-8">
      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <XCircle size={40} className="text-rose-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Booking Failed</h2>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        {error || "We couldn't process your booking at this time. Please try again or choose a different slot."}
      </p>

      <div className="space-y-3">
        {onRetry && (
          <Button onClick={onRetry} className="w-full py-3" variant="primary">
            <RefreshCcw size={18} className="mr-2" />
            Try Again
          </Button>
        )}
        
        <Button 
          onClick={() => offerId ? navigate(`/book/${offerId}`) : navigate('/')} 
          variant="outline" 
          className="w-full py-3"
        >
          <ArrowLeft size={18} className="mr-2" />
          {offerId ? 'Back to Slot Selection' : 'Return Home'}
        </Button>
      </div>
    </div>
  );
};
