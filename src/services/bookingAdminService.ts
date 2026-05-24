import { api } from './api';
import type {
  AdminBooking,
  AdminBookingStatus,
  BookingFilters,
  BookingPaginatedResponse,
} from '../types/bookingAdmin.types';
import { demoAdminBookings } from '../data/demoData';

const fromResponse = (d: any): AdminBooking => ({
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
  updatedAt: d.updatedAt ?? d.createdAt,
  offerTitle: d.offerTitle ?? '',
  slotDate: d.slotDate ?? '',
  slotStartTime: d.slotStartTime ?? '',
  slotEndTime: d.slotEndTime ?? '',
  paymentStatus: d.paymentStatus ?? 'Pending',
});

export const bookingAdminService = {
  getBookings: async (filters: BookingFilters, page = 1, limit = 10): Promise<BookingPaginatedResponse> => {
    try {
      const response = await api.get('/bookings', {
        params: {
          status: filters.status !== 'All' ? filters.status : undefined,
          customerName: filters.searchTerm,
          date: filters.dateFrom,
          pageNumber: page,
          pageSize: limit,
        },
      });
      const raw = response.data.data ?? response.data;

      if (Array.isArray(raw)) {
        return {
          data: raw.map(fromResponse),
          total: raw.length,
          page,
          limit,
          totalPages: Math.ceil(raw.length / limit),
        };
      }

      const items = (raw.items ?? raw.data ?? []).map(fromResponse);
      if (items.length > 0) {
        return {
          data: items,
          total: raw.total ?? raw.totalCount ?? items.length,
          page: raw.pageNumber ?? raw.page ?? page,
          limit: raw.pageSize ?? raw.limit ?? limit,
          totalPages: raw.totalPages ?? Math.max(1, Math.ceil((raw.total ?? raw.totalCount ?? items.length) / limit)),
        };
      }
    } catch {
      // fall through to demo data
    }

    const filtered = demoAdminBookings.filter((booking) => {
      const matchesStatus = !filters.status || filters.status === 'All' || booking.status === filters.status;
      const term = filters.searchTerm?.trim().toLowerCase();
      const matchesSearch = !term
        || booking.customerName.toLowerCase().includes(term)
        || booking.offerTitle.toLowerCase().includes(term)
        || booking.referenceId.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
    const startIndex = (page - 1) * limit;
    const pageItems = filtered.slice(startIndex, startIndex + limit);
    return {
      data: pageItems,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
    };
  },

  getBookingDetails: async (id: string): Promise<AdminBooking> => {
    const response = await api.get(`/bookings/${id}`);
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },

  updateBookingStatus: async (id: string, status: AdminBookingStatus, _reason?: string): Promise<AdminBooking> => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },
};
