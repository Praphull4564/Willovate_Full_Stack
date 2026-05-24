import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { offerService } from '../services/offerService';
import type { CreateOfferDTO } from '../types/offer.types';

export const OFFERS_QUERY_KEY = 'offers';

export const useOffers = () => {
  const queryClient = useQueryClient();

  const offersQuery = useQuery({
    queryKey: [OFFERS_QUERY_KEY],
    queryFn: offerService.getOffers,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateOfferDTO) => offerService.createOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OFFERS_QUERY_KEY] });
      toast.success('Offer created successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create offer');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateOfferDTO> }) => 
      offerService.updateOffer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OFFERS_QUERY_KEY] });
      toast.success('Offer updated successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update offer');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => offerService.deleteOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OFFERS_QUERY_KEY] });
      toast.success('Offer deleted successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete offer');
    },
  });

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    await updateMutation.mutateAsync({ id, data: { status: newStatus } });
  };

  return {
    offers: offersQuery.data ?? [],
    isLoading: offersQuery.isLoading,
    isError: offersQuery.isError,
    createOffer: createMutation.mutateAsync,
    updateOffer: updateMutation.mutateAsync,
    deleteOffer: deleteMutation.mutateAsync,
    toggleStatus,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
