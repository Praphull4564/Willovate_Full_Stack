import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { offerSchema } from '../schemas/offer.schema';
import { offerService } from '../services/offerService';
import { OfferForm } from '../components/offers/OfferForm';
import { OfferPreview } from '../components/offers/OfferPreview';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { APP_ROUTES } from '../config/routes.config';

export const EditOffer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      totalCapacity: 1,
      maxBookingPerCustomer: 1,
      termsAndConditions: '',
      status: 'Active',
    },
  });

  useEffect(() => {
    const loadOffer = async () => {
      if (!id) return;

      try {
        const offer = await offerService.getOfferById(id);
        if (!offer) {
          setError('Offer not found.');
          return;
        }

        form.reset({
          title: offer.title,
          description: offer.description,
          category: offer.category,
          startDate: offer.startDate,
          endDate: offer.endDate,
          startTime: offer.startTime.slice(0, 5),
          endTime: offer.endTime.slice(0, 5),
          originalPrice: offer.originalPrice,
          offerPrice: offer.offerPrice,
          totalCapacity: offer.totalCapacity,
          maxBookingPerCustomer: offer.maxBookingPerCustomer,
          termsAndConditions: offer.termsAndConditions,
          status: offer.status,
        });
      } catch {
        setError('Failed to load offer.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOffer();
  }, [form, id]);

  const formData = form.watch();

  const onSubmit = async (data: any) => {
    if (!id) return;
    const discountPercentage = Math.round(((data.originalPrice - data.offerPrice) / data.originalPrice) * 100);

    setIsSaving(true);
    try {
      await offerService.updateOffer(id, { ...data, discountPercentage });
      navigate(APP_ROUTES.PROTECTED.OFFERS);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{error}</h3>
        <Button variant="outline" onClick={() => navigate(APP_ROUTES.PROTECTED.OFFERS)}>
          Back to Offers
        </Button>
      </div>
    );
  }

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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Edit Offer</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Update offer details, pricing, status, and limits.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 order-2 lg:order-1">
          <form id="edit-offer-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
              <OfferForm form={form} />
            </div>

            <div className="flex justify-end pt-4 space-x-4 sticky bottom-6 z-10">
              <Button type="button" variant="outline" onClick={() => navigate(APP_ROUTES.PROTECTED.OFFERS)}>
                Cancel
              </Button>
              <Button type="submit" form="edit-offer-form" leftIcon={<Save size={18} />} isLoading={isSaving}>
                Save Changes
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
