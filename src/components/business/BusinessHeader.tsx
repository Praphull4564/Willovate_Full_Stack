import React from 'react';
import { Store } from 'lucide-react';
import { useBusiness } from '../../hooks/useBusiness';

export const BusinessHeader: React.FC = () => {
  const { profile } = useBusiness();

  const getInitials = (name?: string) => {
    if (!name) return 'B';
    return name.substring(0, 1).toUpperCase();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
      <div className="flex items-center space-x-4">
        {profile?.logoUrl ? (
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
            <img src={profile.logoUrl} alt={profile.businessName || 'Business Logo'} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl shadow-sm border border-indigo-200 dark:border-indigo-800/50">
            {profile?.businessName ? getInitials(profile.businessName) : <Store size={28} />}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {profile?.businessName || 'Business Profile'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your business details and public profile information.
          </p>
        </div>
      </div>
    </div>
  );
};
