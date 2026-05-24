import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, CalendarDays, Clock, Users, IndianRupee, ScrollText } from 'lucide-react';
import { offerService } from '../services/offerService';
import { OfferStatusBadge } from '../components/offers/OfferStatusBadge';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import type { Offer } from '../types/offer.types';
import { APP_ROUTES } from '../config/routes.config';

export const OfferDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      if (!id) return;
      try {
        const data = await offerService.getOfferById(id);
        if (data) setOffer(data);
        else setError('Offer not found');
      } catch (err) {
        setError('Failed to load offer details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{error || 'Offer not found'}</h3>
        <Button variant="outline" onClick={() => navigate(APP_ROUTES.PROTECTED.OFFERS)}>
          Back to Offers
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={() => navigate(APP_ROUTES.PROTECTED.OFFERS)}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 rounded-xl shadow-sm transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Offer Details</h2>
        </div>
        <Button
          leftIcon={<Edit size={18} />}
          onClick={() => navigate(`/offers/${offer.id}/edit`)}
        >
          Edit Offer
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm mb-6">
        {/* Banner */}
        <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-8 text-white relative">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                  {offer.category}
                </span>
                <OfferStatusBadge status={offer.status} />
              </div>
              <h1 className="text-3xl font-bold mb-2">{offer.title}</h1>
              <p className="text-indigo-100 max-w-xl">{offer.description}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <IndianRupee size={16} className="mr-2 text-indigo-500" /> Pricing Details
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Offer Price</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">₹{offer.offerPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Original Price</span>
                  <span className="text-base text-slate-400 line-through">₹{offer.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Discount</span>
                  <span className="text-sm font-bold text-emerald-500">{offer.discountPercentage}% OFF</span>
                </div>
              </div>
            </div>

            {/* Validity */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <CalendarDays size={16} className="mr-2 text-indigo-500" /> Validity
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Dates</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{offer.startDate} to {offer.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Timings</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{offer.startTime} - {offer.endTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <Users size={16} className="mr-2 text-indigo-500" /> Capacity Rules
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Total Capacity</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{offer.totalCapacity} slots</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Max per Customer</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{offer.maxBookingPerCustomer} bookings</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <ScrollText size={16} className="mr-2 text-indigo-500" /> Terms & Conditions
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {offer.termsAndConditions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
