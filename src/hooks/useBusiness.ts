import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { businessService } from '../services/businessService';
import type { BusinessProfile } from '../types/business.types';

export const BUSINESS_QUERY_KEY = 'business-profile';

export const useBusiness = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [BUSINESS_QUERY_KEY],
    queryFn: businessService.getBusinessProfile,
  });

  const createMutation = useMutation({
    mutationFn: (data: BusinessProfile) => businessService.createBusinessProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData([BUSINESS_QUERY_KEY], data);
      toast.success('Business profile created successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create profile');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BusinessProfile }) => 
      businessService.updateBusinessProfile(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData([BUSINESS_QUERY_KEY], data);
      toast.success('Business profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    },
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    createProfile: createMutation.mutateAsync,
    updateProfile: updateMutation.mutateAsync,
    isSaving: createMutation.isPending || updateMutation.isPending,
  };
};
