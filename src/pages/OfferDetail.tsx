import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublicOfferDetails, usePublicOfferSlots } from '../hooks/usePublicOffers';
import { OfferDetailHeader } from '../components/public/OfferDetailHeader';
import { PriceCard } from '../components/public/PriceCard';
import { SlotPreview } from '../components/public/SlotPreview';
import { RelatedOffers } from '../components/public/RelatedOffers';
import { usePublicOffers } from '../hooks/usePublicOffers';
import { EmptyState } from '../components/ui/EmptyState';
import { Loader } from '../components/ui/Loader';
import { SearchX, ArrowLeft } from 'lucide-react';

export const OfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { offer, isLoading: isOfferLoading, isError: isOfferError } = usePublicOfferDetails(id);
  const { slots, isLoading: isSlotsLoading } = usePublicOfferSlots(id);
  const { offers: allOffers, isLoading: isAllOffersLoading } = usePublicOffers();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isOfferLoading) {
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
            description="The offer you're looking for might have expired, been removed, or the link is broken."
            actionLabel="Back to Home"
            onAction={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  // Get related offers (same category, exclude current)
  const relatedOffers = allOffers.filter(o => o.category === offer.category && o.id !== offer.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* Back navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group w-fit"
          >
            <ArrowLeft size={16} className="mr-1.5 transform group-hover:-translate-x-1 transition-transform" />
            Back to results
          </button>
        </div>
      </div>

      <OfferDetailHeader offer={offer} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            <section>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About this offer</h3>
              <div className="prose prose-slate dark:prose-invert max-w-none prose-lg text-slate-600 dark:text-slate-400">
                <p>
                  Experience the best we have to offer with this exclusive package. {offer.description} 
                  Whether you're looking for an unforgettable experience or top-tier service, this offer is tailored just for you.
                </p>
                <ul>
                  <li>Premium service guaranteed</li>
                  <li>Experienced professionals</li>
                  <li>Top-rated by our customers</li>
                </ul>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <SlotPreview slots={slots} isLoading={isSlotsLoading} />
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Terms & Conditions</h3>
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>Offer is valid only for the booked slot time.</li>
                  <li>Please arrive 10 minutes prior to your scheduled time.</li>
                  <li>Cancellations must be made at least 24 hours in advance for a full refund.</li>
                  <li>Cannot be combined with any other ongoing promotions or discounts.</li>
                  <li>The business reserves the right to verify booking details upon arrival.</li>
                </ul>
              </div>
            </section>

          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <PriceCard offer={offer} />
          </div>

        </div>
      </div>

      <RelatedOffers offers={relatedOffers} isLoading={isAllOffersLoading} />

    </div>
  );
};
