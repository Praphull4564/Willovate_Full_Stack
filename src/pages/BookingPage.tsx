import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublicOfferDetails, usePublicOfferSlots } from '../hooks/usePublicOffers';
import { useBooking } from '../hooks/useBooking';
import { SlotSelector } from '../components/booking/SlotSelector';
import { BookingForm } from '../components/booking/BookingForm';
import { BookingSummary } from '../components/booking/BookingSummary';
import { Stepper } from '../components/ui/Stepper';
import { Alert } from '../components/ui/Alert';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { SearchX, ArrowLeft, ShieldCheck } from 'lucide-react';
import type { BookingFormData } from '../schemas/booking.schema';
import { isOfferExpired } from '../utils/bookingValidation';
import { Button } from '../components/ui/Button';
import type { PublicSlot } from '../types/publicOffer.types';

export const BookingPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const navigate = useNavigate();

  const { offer, isLoading: isOfferLoading, isError: isOfferError } = usePublicOfferDetails(offerId);
  const { slots, isLoading: isSlotsLoading } = usePublicOfferSlots(offerId);
  const { createBooking, isCreating, error: bookingError } = useBooking();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | undefined>();
  const [peopleCount, setPeopleCount] = useState(1);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isOfferLoading || isSlotsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader size="lg" />
      </div>
    );
  }

  if (isOfferError || !offer) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-lg w-full">
          <EmptyState
            icon={SearchX}
            title="Offer Not Found"
            description="We couldn't find the offer you're trying to book."
            actionLabel="Browse Offers"
            onAction={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  const expired = isOfferExpired(offer.endDate);

  const handleSlotSelect = (slot: PublicSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(2);
  };

  const handleFormSubmit = async (data: Omit<BookingFormData, 'slotId' | 'offerId'>) => {
    if (!selectedSlot || !offerId) return;

    try {
      const response = await createBooking({
        offerId,
        slotId: selectedSlot.id,
        ...data,
      });
      navigate(`/booking-confirmation/${response.id}`);
    } catch (err: any) {
      // Typically we'd show an inline error, but for critical failures we route to the failed page
      if (err.message.includes('seats left') || err.message.includes('network')) {
        navigate('/booking-failed', { state: { error: err.message, offerId } });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Complete your booking</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <Stepper 
            steps={[
              { id: 1, label: 'Select Slot' },
              { id: 2, label: 'Your Details' },
              { id: 3, label: 'Confirmation' }
            ]} 
            currentStep={currentStep} 
          />
        </div>

        {expired && (
          <Alert 
            type="error" 
            title="Offer Expired" 
            message="This offer is no longer active. You cannot make a new booking." 
            className="mb-8"
          />
        )}

        {bookingError && (
          <Alert 
            type="error" 
            title="Booking Error" 
            message={bookingError.message || 'An unexpected error occurred while booking.'} 
            className="mb-8"
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Flow Area */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Step 1: Slot Selection */}
            <section className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border ${currentStep === 1 ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800'} transition-all duration-300 relative overflow-hidden`}>
              {currentStep !== 1 && (
                <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="bg-white dark:bg-slate-900">
                    Change Slot
                  </Button>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Choose a time slot</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Select an available slot that works for you.</p>
              </div>

              <SlotSelector 
                slots={slots} 
                selectedSlotId={selectedSlot?.id} 
                onSelect={handleSlotSelect} 
              />
            </section>

            {/* Step 2: Form Details */}
            <section className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border ${currentStep === 2 ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800 opacity-60 pointer-events-none'} transition-all duration-300`}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Enter your details</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">We'll use this information to send your booking confirmation.</p>
              </div>

              <BookingForm 
                selectedSlot={selectedSlot}
                onPeopleCountChange={setPeopleCount}
                onSubmit={handleFormSubmit}
              />
            </section>

          </div>

          {/* Sticky Summary Area */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-40 space-y-6">
              <BookingSummary 
                offer={offer} 
                selectedSlot={selectedSlot} 
                peopleCount={peopleCount} 
              />
              
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-4 flex items-start space-x-3 text-sm">
                <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Secure Booking</p>
                  <p className="text-emerald-700 dark:text-emerald-400/80 leading-relaxed">Your data is encrypted. No payment required until you arrive at the venue.</p>
                </div>
              </div>

              <Button 
                onClick={() => {
                  const form = document.getElementById('booking-form') as HTMLFormElement;
                  if (form) {
                    const submitBtn = form.querySelector('#hidden-submit-btn') as HTMLButtonElement;
                    if (submitBtn) submitBtn.click();
                  }
                }}
                disabled={currentStep !== 2 || isCreating || expired}
                isLoading={isCreating}
                className="w-full py-4 text-lg font-bold shadow-xl shadow-indigo-500/25"
              >
                {isCreating ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
