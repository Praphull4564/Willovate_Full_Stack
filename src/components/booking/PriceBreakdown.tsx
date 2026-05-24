import React from 'react';
import type { PublicOffer } from '../../types/publicOffer.types';

interface PriceBreakdownProps {
  offer: PublicOffer;
  peopleCount: number;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ offer, peopleCount }) => {
  const originalTotal = offer.originalPrice * peopleCount;
  const offerTotal = offer.offerPrice * peopleCount;
  const totalSavings = originalTotal - offerTotal;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
        Price Breakdown
      </h4>
      
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex justify-between items-center">
          <span>₹{offer.originalPrice.toLocaleString()} × {peopleCount} {peopleCount === 1 ? 'person' : 'people'}</span>
          <span>₹{originalTotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
          <span>Discount ({offer.discountPercentage}%)</span>
          <span>-₹{totalSavings.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="font-semibold text-slate-900 dark:text-white">Total Amount</span>
          <span className="text-xl font-black text-slate-900 dark:text-white">₹{offerTotal.toLocaleString()}</span>
        </div>
      </div>
      
      {totalSavings > 0 && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold text-center border border-emerald-200 dark:border-emerald-500/20">
          You save ₹{totalSavings.toLocaleString()} on this booking!
        </div>
      )}
    </div>
  );
};
