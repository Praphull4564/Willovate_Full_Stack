import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { slotService } from '../services/slotService';
import type { CreateSlotDTO, UpdateSlotDTO } from '../types/slot.types';

export const SLOTS_QUERY_KEY = 'slots';

export const useSlots = (offerId?: string) => {
  const queryClient = useQueryClient();

  const slotsQuery = useQuery({
    queryKey: offerId ? [SLOTS_QUERY_KEY, offerId] : [SLOTS_QUERY_KEY],
    queryFn: () => offerId ? slotService.getOfferSlots(offerId) : slotService.getAllSlots(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateSlotDTO) => slotService.createSlot(data),
    onSuccess: (createdSlots) => {
      queryClient.invalidateQueries({ queryKey: [SLOTS_QUERY_KEY] });
      toast.success(`${createdSlots.length} slot(s) created successfully!`);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create slots');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSlotDTO }) => 
      slotService.updateSlot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SLOTS_QUERY_KEY] });
      toast.success('Slot updated successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update slot');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => slotService.deleteSlot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SLOTS_QUERY_KEY] });
      toast.success('Slot deleted successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete slot');
    },
  });

  return {
    slots: slotsQuery.data ?? [],
    isLoading: slotsQuery.isLoading,
    isError: slotsQuery.isError,
    createSlot: createMutation.mutateAsync,
    updateSlot: updateMutation.mutateAsync,
    deleteSlot: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
