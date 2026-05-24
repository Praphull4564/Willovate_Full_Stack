import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingAdminService } from '../services/bookingAdminService';
import type { BookingFilters, AdminBookingStatus } from '../types/bookingAdmin.types';

export const ADMIN_BOOKINGS_KEY = 'admin_bookings';
export const ADMIN_BOOKING_DETAILS_KEY = 'admin_booking_details';

export const useAdminBookings = (filters: BookingFilters, page: number, limit: number) => {
  return useQuery({
    queryKey: [ADMIN_BOOKINGS_KEY, filters, page, limit],
    queryFn: () => bookingAdminService.getBookings(filters, page, limit),
    placeholderData: (previousData) => previousData, // keep previous data while fetching new page
  });
};

export const useAdminBookingDetails = (id?: string) => {
  return useQuery({
    queryKey: [ADMIN_BOOKING_DETAILS_KEY, id],
    queryFn: () => id ? bookingAdminService.getBookingDetails(id) : Promise.resolve(null),
    enabled: !!id,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, reason }: { id: string; status: AdminBookingStatus; reason?: string }) => 
      bookingAdminService.updateBookingStatus(id, status, reason),
    onSuccess: (updatedBooking) => {
      // Invalidate both lists and specific detail query
      queryClient.invalidateQueries({ queryKey: [ADMIN_BOOKINGS_KEY] });
      queryClient.setQueryData([ADMIN_BOOKING_DETAILS_KEY, updatedBooking.id], updatedBooking);
    },
  });
};
