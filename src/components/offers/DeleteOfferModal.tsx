import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface DeleteOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  offerTitle?: string;
}

export const DeleteOfferModal: React.FC<DeleteOfferModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  offerTitle,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Offer">
      <div className="flex flex-col items-center text-center pb-4">
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Are you absolutely sure?
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          This action cannot be undone. This will permanently delete the offer
          {offerTitle ? <span className="font-semibold text-slate-700 dark:text-slate-300"> "{offerTitle}" </span> : ' '}
          and remove its data from our servers.
        </p>
        <div className="flex w-full space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Yes, delete offer
          </Button>
        </div>
      </div>
    </Modal>
  );
};
