import React from 'react';
import { SearchX, CalendarX, Inbox, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  secondaryActionLabel?: React.ReactNode;
  onSecondaryAction?: () => void;
}

const EmptyStateBase: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50">
    <div className="w-16 h-16 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center mb-6 text-slate-400 dark:text-slate-500">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">{description}</p>
    
    <div className="flex items-center gap-4">
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
      {secondaryActionLabel && onSecondaryAction && (
        <Button variant="outline" onClick={onSecondaryAction}>
          {secondaryActionLabel}
        </Button>
      )}
    </div>
  </div>
);

export const EmptySearch: React.FC<{ onClear: () => void }> = ({ onClear }) => (
  <EmptyStateBase
    icon={<SearchX size={32} />}
    title="No results found"
    description="We couldn't find anything matching your search criteria. Try adjusting your filters or search terms."
    actionLabel="Clear Filters"
    onAction={onClear}
  />
);

export const EmptyBookings: React.FC<{ onExplore: () => void }> = ({ onExplore }) => (
  <EmptyStateBase
    icon={<CalendarX size={32} />}
    title="No bookings yet"
    description="You haven't made any bookings. Explore our active offers and find your next experience!"
    actionLabel="Explore Offers"
    onAction={onExplore}
  />
);

export const EmptyOffers: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <EmptyStateBase
    icon={<Inbox size={32} />}
    title="No offers found"
    description="You don't have any active offers right now. Create your first offer to start accepting bookings."
    actionLabel={
      <span className="flex items-center">
        <Plus size={18} className="mr-2" />
        Create Offer
      </span>
    }
    onAction={onCreate}
  />
);
