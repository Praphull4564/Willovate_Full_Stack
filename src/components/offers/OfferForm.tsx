import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Tag, IndianRupee, CalendarDays, Clock, Users } from 'lucide-react';
import type { OfferFormData } from '../../schemas/offer.schema';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/TextArea';

interface OfferFormProps {
  form: UseFormReturn<OfferFormData>;
}

export const OfferForm: React.FC<OfferFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <FormSection title="Offer Details" description="Basic information about what you're offering.">
        <Input
          label="Offer Title"
          placeholder="e.g. Early Bird Gym Access"
          leftIcon={<Tag size={18} />}
          error={errors.title?.message}
          {...register('title')}
        />
        <Select
          label="Category"
          options={[
            { label: 'Fitness', value: 'Fitness' },
            { label: 'Beauty', value: 'Beauty' },
            { label: 'Health', value: 'Health' },
            { label: 'Education', value: 'Education' },
            { label: 'Sports', value: 'Sports' },
            { label: 'Other', value: 'Other' },
          ]}
          error={errors.category?.message}
          {...register('category')}
        />
        <div className="col-span-full">
          <TextArea
            label="Description"
            placeholder="Describe the benefits and details of this offer..."
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </FormSection>

      <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

      {/* Pricing */}
      <FormSection title="Pricing" description="Set the original price and your discounted offer price.">
        <Input
          label="Original Price"
          type="number"
          placeholder="0.00"
          leftIcon={<IndianRupee size={18} />}
          error={errors.originalPrice?.message}
          {...register('originalPrice')}
        />
        <Input
          label="Offer Price"
          type="number"
          placeholder="0.00"
          leftIcon={<IndianRupee size={18} />}
          error={errors.offerPrice?.message}
          {...register('offerPrice')}
        />
      </FormSection>

      <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

      {/* Validity */}
      <FormSection title="Validity & Timings" description="When is this offer valid?">
        <Input
          label="Start Date"
          type="date"
          leftIcon={<CalendarDays size={18} />}
          error={errors.startDate?.message}
          {...register('startDate')}
        />
        <Input
          label="End Date"
          type="date"
          leftIcon={<CalendarDays size={18} />}
          error={errors.endDate?.message}
          {...register('endDate')}
        />
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
      </FormSection>

      <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

      {/* Capacity & Rules */}
      <FormSection title="Capacity & Rules" description="Set limits and conditions for bookings.">
        <Input
          label="Total Capacity"
          type="number"
          placeholder="e.g. 50"
          leftIcon={<Users size={18} />}
          error={errors.totalCapacity?.message}
          {...register('totalCapacity')}
        />
        <Input
          label="Max Bookings per Customer"
          type="number"
          placeholder="e.g. 1"
          leftIcon={<Users size={18} />}
          error={errors.maxBookingPerCustomer?.message}
          {...register('maxBookingPerCustomer')}
        />
        <div className="col-span-full">
          <TextArea
            label="Terms and Conditions"
            placeholder="e.g. Non-refundable. Valid ID required."
            error={errors.termsAndConditions?.message}
            {...register('termsAndConditions')}
          />
        </div>
      </FormSection>
    </div>
  );
};
