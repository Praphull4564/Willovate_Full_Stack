import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, PauseCircle, PlayCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import type { Offer } from '../../types/offer.types';
import { OfferStatusBadge } from './OfferStatusBadge';
import { APP_ROUTES } from '../../config/routes.config';

interface OfferTableProps {
  offers: Offer[];
  onToggleStatus: (id: string, currentStatus: string) => void;
  onDeleteClick: (id: string) => void;
}

export const OfferTable: React.FC<OfferTableProps> = ({ offers, onToggleStatus, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Offer Info</TableHead>
            <TableHead>Pricing</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow 
              key={offer.id}
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              onClick={() => navigate(APP_ROUTES.PROTECTED.OFFER_DETAILS(offer.id))}
            >
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{offer.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{offer.category}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-white">₹{offer.offerPrice}</span>
                  <span className="text-xs text-slate-400 line-through">₹{offer.originalPrice}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p className="text-slate-900 dark:text-slate-200">{offer.startDate} to {offer.endDate}</p>
                  <p className="text-xs text-slate-500">{offer.startTime} - {offer.endTime}</p>
                </div>
              </TableCell>
              <TableCell>
                <OfferStatusBadge status={offer.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => onToggleStatus(offer.id, offer.status)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                    title={offer.status === 'Active' ? 'Pause' : 'Activate'}
                  >
                    {offer.status === 'Active' ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                  </button>
                  <button 
                    onClick={() => navigate(`/offers/${offer.id}/edit`)}
                    className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => onDeleteClick(offer.id)}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
