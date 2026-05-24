import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SlotForm } from './SlotForm';
import { slotSchema } from '../../schemas/slot.schema';
import type { SlotFormData } from '../../schemas/slot.schema';

interface CreateSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SlotFormData) => Promise<void>;
  isSubmitting: boolean;
  initialDate?: string;
  initialTime?: string;
}

export const CreateSlotModal: React.FC<CreateSlotModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  initialDate,
  initialTime,
}) => {
  const form = useForm<any>({
    resolver: zodResolver(slotSchema) as any,
    defaultValues: {
      offerId: '',
      slotDate: initialDate || '',
      startTime: initialTime || '09:00',
      endTime: initialTime ? `${parseInt(initialTime.split(':')[0]) + 1}:00` : '10:00',
      capacity: 10,
      status: 'Available',
      isRecurring: false,
      repeatUntil: '',
      repeatDays: [],
    },
  });

  // Reset form when modal opens with new initial values
  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        ...form.getValues(),
        slotDate: initialDate || '',
        startTime: initialTime || '09:00',
        endTime: initialTime ? `${parseInt(initialTime.split(':')[0]) + 1}:00` : '10:00',
      });
    }
  }, [isOpen, initialDate, initialTime, form]);

  const handleSubmit = async (data: any) => {
    await onSubmit(data);
    onClose();
    form.reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Slot">
      <form id="create-slot-form" onSubmit={form.handleSubmit(handleSubmit)}>
        <SlotForm form={form} />
        
        <div className="flex justify-end pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-x-3">
          <Button variant="outline" onClick={onClose} type="button" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="create-slot-form" isLoading={isSubmitting}>
            Create Slot
          </Button>
        </div>
      </form>
    </Modal>
  );
};
