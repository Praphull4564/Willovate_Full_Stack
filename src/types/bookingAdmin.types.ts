export type AdminBookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'No Show';

export interface AdminBooking {
  id: string;
  referenceId: string;
  offerId: string;
  slotId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  peopleCount: number;
  specialNote?: string;
  totalPrice: number;
  status: AdminBookingStatus;
  createdAt: string;
  updatedAt: string;
  
  // Joined fields for display
  offerTitle: string;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  
  // Payment info (placeholder)
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

export interface BookingAnalyticsData {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  noShows: number;
  completedBookings: number;
  totalRevenue: number;
  conversionRate: number; // percentage of confirmed+completed out of total
}

export interface BookingFilters {
  searchTerm?: string;
  status?: AdminBookingStatus | 'All';
  dateFrom?: string;
  dateTo?: string;
  offerId?: string | 'All';
  sortBy?: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';
}

export interface BookingPaginatedResponse {
  data: AdminBooking[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
