import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Mail, User } from 'lucide-react';
import { useWaitlist } from '../../hooks/useWaitlist';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  offerId: string;
  slotId: string;
  onSuccess?: () => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ offerId, slotId, onSuccess }) => {
  const { joinWaitlist } = useWaitlist();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema)
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      await joinWaitlist(offerId, slotId, data);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">You're on the list!</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-500">
          We'll notify you immediately if a spot opens up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            {...register('name')}
            className={`w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border rounded-xl outline-none transition-all ${
              errors.name 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' 
                : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/20'
            }`}
            placeholder="John Doe"
          />
        </div>
        {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            {...register('email')}
            className={`w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border rounded-xl outline-none transition-all ${
              errors.email 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' 
                : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/20'
            }`}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
        isLoading={isSubmitting}
      >
        Join Waitlist
      </Button>
    </form>
  );
};
