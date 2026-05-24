import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { offerSchema } from '../schemas/offer.schema';
import { useOffers } from '../hooks/useOffers';
import { OfferForm } from '../components/offers/OfferForm';
import { OfferPreview } from '../components/offers/OfferPreview';
import { Button } from '../components/ui/Button';
import { APP_ROUTES } from '../config/routes.config';

export const CreateOffer: React.FC = () => {
  const navigate = useNavigate();
  const { createOffer, isCreating } = useOffers();

  const form = useForm<any>({
    resolver: zodResolver(offerSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      category: 'Fitness',
      startDate: '',
      endDate: '',
      startTime: '09:00',
      endTime: '18:00',
      originalPrice: 0,
      offerPrice: 0,
      totalCapacity: 0,
      maxBookingPerCustomer: 1,
      termsAndConditions: '',
      status: 'Active',
    },
  });

  const { handleSubmit, watch } = form;
  const formData = watch();

  const onSubmit = async (data: any) => {
    // Calculate discount automatically
    const discount = data.originalPrice && data.offerPrice
      ? Math.round(((data.originalPrice - data.offerPrice) / data.originalPrice) * 100)
      : 0;

    await createOffer({
      ...data,
      discountPercentage: discount,
    });
    navigate(APP_ROUTES.PROTECTED.OFFERS);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={() => navigate(APP_ROUTES.PROTECTED.OFFERS)}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 rounded-xl shadow-sm transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Create Offer</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Launch a new promotional slot or campaign.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 order-2 lg:order-1">
          <form id="create-offer-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
              <OfferForm form={form} />
            </div>

            <div className="flex justify-end pt-4 space-x-4 sticky bottom-6 z-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(APP_ROUTES.PROTECTED.OFFERS)}
                className="bg-white dark:bg-slate-900 shadow-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="create-offer-form"
                leftIcon={<Save size={18} />}
                isLoading={isCreating}
                className="shadow-lg shadow-primary/25"
              >
                Create Offer
              </Button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-96 shrink-0 order-1 lg:order-2">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Live Preview
            </h3>
            <OfferPreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};
