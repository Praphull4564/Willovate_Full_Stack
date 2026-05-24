import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Save, Building2, User as UserIcon, Phone, Mail, Building } from 'lucide-react';

import { businessSchema } from '../../schemas/business.schema';
import type { BusinessFormData } from '../../schemas/business.schema';
import { BUSINESS_TYPES } from '../../constants/businessTypes';
import { useBusiness } from '../../hooks/useBusiness';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { LogoUploader } from './LogoUploader';
import { BusinessTiming } from './BusinessTiming';

export const BusinessForm: React.FC = () => {
  const { profile, createProfile, updateProfile, isSaving } = useBusiness();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: '',
      businessType: 'Other',
      ownerName: '',
      phoneNumber: '',
      email: '',
      address: '',
      city: '',
      openingTime: '09:00',
      closingTime: '18:00',
      logoUrl: '',
    },
  });

  // Load existing profile data if available
  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = async (data: BusinessFormData) => {
    try {
      if (profile?.id) {
        await updateProfile({ id: profile.id, data });
      } else {
        await createProfile(data);
      }
      reset(data); // reset form with new saved data to clear dirty state
    } catch (error) {
      // Error is handled by the hook
      console.error(error);
    }
  };

  const businessTypeOptions = BUSINESS_TYPES.map(type => ({
    label: type,
    value: type,
  }));

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-8"
    >
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        {/* Logo Section */}
        <FormSection 
          title="Business Logo" 
          description="Upload your business logo to display on your profile and booking pages."
          className="mb-8"
        >
          <div className="col-span-full">
            <Controller
              name="logoUrl"
              control={control}
              render={({ field }) => (
                <LogoUploader
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.logoUrl?.message}
                />
              )}
            />
          </div>
        </FormSection>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-8 w-full" />

        {/* Basic Details */}
        <FormSection 
          title="Basic Information" 
          description="Key details about your business identity."
        >
          <Input
            label="Business Name"
            placeholder="e.g. FitZone Gym"
            leftIcon={<Building2 size={18} />}
            error={errors.businessName?.message}
            {...register('businessName')}
          />
          <Select
            label="Business Type"
            options={businessTypeOptions}
            error={errors.businessType?.message}
            {...register('businessType')}
          />
        </FormSection>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-8 w-full" />

        {/* Contact Details */}
        <FormSection 
          title="Contact & Location" 
          description="Where and how customers can reach you."
        >
          <Input
            label="Owner Name"
            placeholder="e.g. John Doe"
            leftIcon={<UserIcon size={18} />}
            error={errors.ownerName?.message}
            {...register('ownerName')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. contact@fitzone.com"
            leftIcon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone Number"
            placeholder="e.g. 9876543210"
            leftIcon={<Phone size={18} />}
            error={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />
          <Input
            label="City"
            placeholder="e.g. Lucknow"
            leftIcon={<Building size={18} />}
            error={errors.city?.message}
            {...register('city')}
          />
          <div className="col-span-full">
            <TextArea
              label="Full Address"
              placeholder="e.g. 123 Main Street, Sector 4..."
              error={errors.address?.message}
              {...register('address')}
            />
          </div>
        </FormSection>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-8 w-full" />

        {/* Operating Hours */}
        <FormSection 
          title="Operating Hours" 
          description="Set your default daily opening and closing times."
        >
          <div className="col-span-full">
            <BusinessTiming register={register} errors={errors} />
          </div>
        </FormSection>

      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4 space-x-4 sticky bottom-6 z-10">
        <Button
          type="button"
          variant="outline"
          disabled={!isDirty || isSaving}
          onClick={() => profile && reset(profile)}
          className="bg-white dark:bg-slate-900 shadow-sm"
        >
          Discard Changes
        </Button>
        <Button
          type="submit"
          leftIcon={<Save size={18} />}
          isLoading={isSaving}
          disabled={!isDirty}
          className="shadow-lg shadow-primary/25"
        >
          {profile?.id ? 'Update Profile' : 'Save Profile'}
        </Button>
      </div>
    </motion.form>
  );
};
