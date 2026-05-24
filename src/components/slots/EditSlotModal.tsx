import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SlotForm } from './SlotForm';
import { slotSchema } from '../../schemas/slot.schema';
import type { Slot } from '../../types/slot.types';

interface EditSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: any) => Promise<void>;
  isSubmitting: boolean;
  slot: Slot | null;
}

export const EditSlotModal: React.FC<EditSlotModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  slot,
}) => {
  const form = useForm<any>({
    resolver: zodResolver(slotSchema) as any,
    defaultValues: {
      offerId: '',
      slotDate: '',
      startTime: '',
      endTime: '',
      capacity: 10,
      status: 'Available',
    },
  });

  useEffect(() => {
    if (isOpen && slot) {
      form.reset({
        offerId: slot.offerId,
        slotDate: slot.slotDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
        capacity: slot.capacity,
        status: slot.status,
      });
    }
  }, [isOpen, slot, form]);

  const handleSubmit = async (data: any) => {
    if (!slot) return;
    await onSubmit(slot.id, data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Slot">
      <form id="edit-slot-form" onSubmit={form.handleSubmit(handleSubmit)}>
        <SlotForm form={form} isEditMode={true} />
        
        <div className="flex justify-end pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-x-3">
          <Button variant="outline" onClick={onClose} type="button" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="edit-slot-form" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
