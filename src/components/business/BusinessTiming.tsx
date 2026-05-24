import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Clock } from 'lucide-react';
import { Input } from '../ui/Input';
import type { BusinessFormData } from '../../schemas/business.schema';

interface BusinessTimingProps {
  register: UseFormRegister<BusinessFormData>;
  errors: FieldErrors<BusinessFormData>;
}

export const BusinessTiming: React.FC<BusinessTimingProps> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
      <Input
        label="Opening Time"
        type="time"
        leftIcon={<Clock size={18} className="text-indigo-500" />}
        error={errors.openingTime?.message}
        {...register('openingTime')}
      />
      
      <Input
        label="Closing Time"
        type="time"
        leftIcon={<Clock size={18} className="text-indigo-500" />}
        error={errors.closingTime?.message}
        {...register('closingTime')}
      />
    </div>
  );
};
