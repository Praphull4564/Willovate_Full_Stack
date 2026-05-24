import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BookingFormData } from '../../schemas/booking.schema';
import { bookingSchema } from '../../schemas/booking.schema';
import { Input } from '../ui/Input';
import { Mail, Phone, User, Users, AlignLeft } from 'lucide-react';
import type { PublicSlot } from '../../types/publicOffer.types';
import { CapacityIndicator } from './CapacityIndicator';

interface BookingFormProps {
  selectedSlot?: PublicSlot;
  onSubmit: (data: Omit<BookingFormData, 'slotId' | 'offerId'>) => void;
  onPeopleCountChange: (count: number) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedSlot, onSubmit, onPeopleCountChange }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<BookingFormData, 'slotId' | 'offerId'>>({
    resolver: zodResolver(bookingSchema.omit({ slotId: true, offerId: true })),
    mode: 'onChange',
    defaultValues: {
      peopleCount: 1,
    }
  });

  const peopleCount = watch('peopleCount');

  // Notify parent of people count change for capacity math
  React.useEffect(() => {
    onPeopleCountChange(peopleCount || 1);
  }, [peopleCount, onPeopleCountChange]);

  return (
    <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          leftIcon={<User size={18} />}
          {...register('customerName')}
          error={errors.customerName?.message}
        />
        
        <Input
          label="Phone Number"
          placeholder="1234567890"
          type="tel"
          leftIcon={<Phone size={18} />}
          {...register('customerPhone')}
          error={errors.customerPhone?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address (Optional)"
          placeholder="john@example.com"
          type="email"
          leftIcon={<Mail size={18} />}
          {...register('customerEmail')}
          error={errors.customerEmail?.message}
        />
        
        <div>
          <Input
            label="Number of People"
            placeholder="2"
            type="number"
            min={1}
            max={50}
            leftIcon={<Users size={18} />}
            {...register('peopleCount', { valueAsNumber: true })}
            error={errors.peopleCount?.message}
          />
        </div>
      </div>

      {selectedSlot && (
        <div className="pt-2">
          <CapacityIndicator 
            slot={selectedSlot} 
            requestedCount={peopleCount}
            maxCapacity={20} // Mock total capacity
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Special Notes (Optional)
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-4 text-slate-400">
            <AlignLeft size={18} />
          </div>
          <textarea
            {...register('specialNote')}
            rows={3}
            placeholder="Any special requirements or requests?"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
        {errors.specialNote?.message && (
          <p className="mt-2 text-sm text-rose-500 font-medium flex items-center">
            {errors.specialNote.message}
          </p>
        )}
      </div>

      {/* Hidden submit button to allow external triggering or standard form submission */}
      <button type="submit" className="hidden" id="hidden-submit-btn">Submit</button>
    </form>
  );
};
