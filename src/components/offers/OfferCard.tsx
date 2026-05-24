import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Users, Edit, Trash2, PauseCircle, PlayCircle } from 'lucide-react';
import type { Offer } from '../../types/offer.types';
import { OfferStatusBadge } from './OfferStatusBadge';
import { APP_ROUTES } from '../../config/routes.config';

interface OfferCardProps {
  offer: Offer;
  onToggleStatus: (id: string, currentStatus: string) => void;
  onDeleteClick: (id: string) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onToggleStatus, onDeleteClick }) => {
  const navigate = useNavigate();

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div 
      onClick={() => navigate(APP_ROUTES.PROTECTED.OFFER_DETAILS(offer.id))}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="p-6 pb-4 relative flex-1">
        <div className="flex justify-between items-start mb-4">
          <OfferStatusBadge status={offer.status} />
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => handleAction(e, () => onToggleStatus(offer.id, offer.status))}
              className="p-1.5 text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
              title={offer.status === 'Active' ? 'Pause Offer' : 'Activate Offer'}
            >
              {offer.status === 'Active' ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
            </button>
            <button 
              onClick={(e) => handleAction(e, () => navigate(`/offers/${offer.id}/edit`))}
              className="p-1.5 text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
              title="Edit Offer"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={(e) => handleAction(e, () => onDeleteClick(offer.id))}
              className="p-1.5 text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
              title="Delete Offer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
          {offer.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {offer.description}
        </p>

        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            ₹{offer.offerPrice}
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
            ₹{offer.originalPrice}
          </span>
          <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md">
            {offer.discountPercentage}% OFF
          </span>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 shrink-0">
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <CalendarDays size={14} className="text-slate-400" />
          <span className="text-xs font-medium truncate">{offer.startDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <Users size={14} className="text-slate-400" />
          <span className="text-xs font-medium truncate">Cap: {offer.totalCapacity}</span>
        </div>
      </div>
    </div>
  );
};
