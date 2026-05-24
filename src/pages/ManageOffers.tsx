import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useOffers } from '../hooks/useOffers';
import { OfferCard } from '../components/offers/OfferCard';
import { OfferTable } from '../components/offers/OfferTable';
import { OfferFilters } from '../components/offers/OfferFilters';
import { DeleteOfferModal } from '../components/offers/DeleteOfferModal';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { APP_ROUTES } from '../config/routes.config';

export const ManageOffers: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { offers, isLoading, toggleStatus, deleteOffer, isDeleting } = useOffers();
  
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            offer.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || offer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [offers, searchTerm, statusFilter]);

  const handleDeleteClick = (id: string) => {
    const offer = offers.find(o => o.id === id);
    if (offer) {
      setOfferToDelete({ id: offer.id, title: offer.title });
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (offerToDelete) {
      await deleteOffer(offerToDelete.id);
      setDeleteModalOpen(false);
      setOfferToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Offers</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create, pause, and manage your promotional slots.
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <Button
            leftIcon={<Plus size={18} />}
            onClick={() => navigate(APP_ROUTES.PROTECTED.CREATE_OFFER)}
            className="w-full sm:w-auto shadow-lg shadow-primary/25"
          >
            Create Offer
          </Button>
        </div>
      </div>

      <OfferFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {filteredOffers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <LayoutGrid size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No offers found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            You don't have any offers matching your current filters. Try adjusting your search or create a new offer.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onToggleStatus={toggleStatus}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <OfferTable
          offers={filteredOffers}
          onToggleStatus={toggleStatus}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <DeleteOfferModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        offerTitle={offerToDelete?.title}
      />
    </div>
  );
};
