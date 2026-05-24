import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { CalendarDays, Clock, Users, Repeat } from 'lucide-react';
import type { SlotFormData } from '../../schemas/slot.schema';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useOffers } from '../../hooks/useOffers';
import { SLOT_STATUSES } from '../../constants/slotStatus';

interface SlotFormProps {
  form: UseFormReturn<SlotFormData>;
  isEditMode?: boolean;
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Su' },
  { value: 1, label: 'Mo' },
  { value: 2, label: 'Tu' },
  { value: 3, label: 'We' },
  { value: 4, label: 'Th' },
  { value: 5, label: 'Fr' },
  { value: 6, label: 'Sa' },
];

export const SlotForm: React.FC<SlotFormProps> = ({ form, isEditMode = false }) => {
  const { register, watch, setValue, formState: { errors } } = form;
  const { offers } = useOffers();
  
  const isRecurring = watch('isRecurring');
  const repeatDays = watch('repeatDays') || [];

  const toggleDay = (dayValue: number) => {
    const newDays = repeatDays.includes(dayValue)
      ? repeatDays.filter(d => d !== dayValue)
      : [...repeatDays, dayValue];
    setValue('repeatDays', newDays, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <Select
        label="Select Offer"
        options={offers.map(o => ({ label: o.title, value: o.id }))}
        error={errors.offerId?.message}
        disabled={isEditMode}
        {...register('offerId')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Slot Date"
          type="date"
          leftIcon={<CalendarDays size={18} />}
          error={errors.slotDate?.message}
          {...register('slotDate')}
        />
        <Input
          label="Capacity"
          type="number"
          placeholder="Max participants"
          leftIcon={<Users size={18} />}
          error={errors.capacity?.message}
          {...register('capacity')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Time"
          type="time"
          leftIcon={<Clock size={18} />}
          error={errors.startTime?.message}
          {...register('startTime')}
        />
        <Input
          label="End Time"
          type="time"
          leftIcon={<Clock size={18} />}
          error={errors.endTime?.message}
          {...register('endTime')}
        />
      </div>

      <Select
        label="Status"
        options={SLOT_STATUSES.map(s => ({ label: s, value: s }))}
        error={errors.status?.message}
        {...register('status')}
      />

      {!isEditMode && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <label className="flex items-center space-x-3 mb-4 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                className="peer sr-only"
                {...register('isRecurring')}
              />
              <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
              <Repeat size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Bulk Generate (Recurring Slot)
            </span>
          </label>

          {isRecurring && (
            <div className="space-y-4 pl-8 border-l-2 border-slate-100 dark:border-slate-800 ml-2 animate-in slide-in-from-top-2">
              <Input
                label="Repeat Until"
                type="date"
                leftIcon={<CalendarDays size={18} />}
                error={errors.repeatUntil?.message}
                {...register('repeatUntil')}
              />
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Repeat on days
                </label>
                <div className="flex space-x-2">
                  {DAYS_OF_WEEK.map(day => {
                    const isSelected = repeatDays.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleDay(day.value)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          isSelected 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
                {errors.repeatDays?.message && (
                  <p className="text-sm text-rose-500 mt-1">{errors.repeatDays.message}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
