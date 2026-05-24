import React from 'react';
import { motion } from 'framer-motion';
import { BusinessHeader } from '../components/business/BusinessHeader';
import { BusinessForm } from '../components/business/BusinessForm';
import { useBusiness } from '../hooks/useBusiness';
import { Loader } from '../components/ui/Loader';

export const BusinessProfile: React.FC = () => {
  const { isLoading, isError } = useBusiness();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Failed to load profile</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          There was an error loading your business profile. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-12"
    >
      <BusinessHeader />
      <BusinessForm />
    </motion.div>
  );
};
