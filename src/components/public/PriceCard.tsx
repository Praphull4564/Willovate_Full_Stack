import React from 'react';
import { Tag, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import type { PublicOffer } from '../../types/publicOffer.types';
import { CountdownTimer } from './CountdownTimer';
import { Button } from '../ui/Button';

interface PriceCardProps {
  offer: PublicOffer;
}

export const PriceCard: React.FC<PriceCardProps> = ({ offer }) => {
  const isExpiringSoon = new Date(offer.endDate).getTime() - Date.now() < 24 * 60 * 60 * 1000;
  const isLowCapacity = offer.totalAvailableSlots < 10;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none sticky top-24">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 dark:text-slate-400 line-through text-lg">
            ₹{offer.originalPrice.toLocaleString()}
          </span>
          <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <Tag size={14} className="mr-1" />
            {offer.discountPercentage}% OFF
          </span>
        </div>
        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">
          ₹{offer.offerPrice.toLocaleString()}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Excluding applicable taxes</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex-1">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Offer ends in</div>
            <CountdownTimer endDate={offer.endDate} compact className="!space-x-1" />
          </div>
          {isExpiringSoon && (
            <AlertCircle className="text-rose-500" size={24} />
          )}
        </div>

        <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex-1">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Available capacity</div>
            <div className={`font-bold text-lg ${isLowCapacity ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
              {offer.totalAvailableSlots} slots left
            </div>
          </div>
          <Users className={isLowCapacity ? 'text-rose-500' : 'text-indigo-500'} size={24} />
        </div>
      </div>

      <Button className="w-full py-4 text-lg font-bold shadow-lg shadow-primary/25 rounded-xl mb-6">
        Select a Slot
      </Button>

      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-start space-x-2">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Instant confirmation after booking</span>
        </div>
        <div className="flex items-start space-x-2">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Free cancellation up to 24 hours before</span>
        </div>
        <div className="flex items-start space-x-2">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
};
