import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../services/bookingService';
import type { CreateBookingRequest } from '../types/booking.types';
import { PUBLIC_OFFER_SLOTS_KEY } from './usePublicOffers';

export const BOOKING_DETAILS_KEY = 'booking_details';

export const useBooking = () => {
  const queryClient = useQueryClient();

  const createBookingMutation = useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingService.createBooking(data),
    onSuccess: (data) => {
      // Invalidate slots to refresh capacity
      queryClient.invalidateQueries({ queryKey: [PUBLIC_OFFER_SLOTS_KEY, data.offerId] });
    },
  });

  return {
    createBooking: createBookingMutation.mutateAsync,
    isCreating: createBookingMutation.isPending,
    error: createBookingMutation.error,
  };
};

export const useBookingDetails = (bookingId?: string) => {
  const { data: booking = null, isLoading, isError } = useQuery({
    queryKey: [BOOKING_DETAILS_KEY, bookingId],
    queryFn: () => bookingId ? bookingService.getBookingDetails(bookingId) : Promise.resolve(null),
    enabled: !!bookingId,
  });

  return { booking, isLoading, isError };
};
