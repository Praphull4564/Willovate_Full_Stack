import { api } from './api';
import type { CreateBookingRequest, BookingResponse } from '../types/booking.types';

const fromResponse = (d: any): BookingResponse => ({
  id: d.id,
  referenceId: d.bookingReference,
  offerId: d.offerId,
  slotId: d.slotId,
  customerName: d.customerName,
  customerPhone: d.customerPhone,
  customerEmail: d.customerEmail,
  peopleCount: d.peopleCount,
  specialNote: d.specialNote,
  totalPrice: d.totalPrice ?? 0,
  status: d.status,
  createdAt: d.createdAt,
  offerTitle: d.offerTitle,
  businessName: d.businessName,
  slotDate: d.slotDate,
  slotStartTime: d.slotStartTime,
  slotEndTime: d.slotEndTime,
});

export const bookingService = {
  createBooking: async (data: CreateBookingRequest): Promise<BookingResponse> => {
    const payload = {
      offerId: data.offerId,
      slotId: data.slotId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail ?? '',
      peopleCount: data.peopleCount,
      specialNote: data.specialNote ?? '',
    };
    const response = await api.post('/bookings', payload);
    const responseData = response.data.data ?? response.data;
    return fromResponse(responseData);
  },

  getBookingDetails: async (id: string): Promise<BookingResponse> => {
    const response = await api.get(`/bookings/${id}`);
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },
};
