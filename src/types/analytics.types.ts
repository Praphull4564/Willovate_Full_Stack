export interface DashboardSummary {
  totalOffers: number;
  activeOffers: number;
  totalBookings: number;
  todayBookings: number;
  totalCapacity: number;
  bookedSeats: number;
  availableSeats: number;
  conversionRate: number;
  trends: {
    totalOffers: number;
    activeOffers: number;
    totalBookings: number;
    todayBookings: number;
    totalCapacity: number;
    bookedSeats: number;
    availableSeats: number;
    conversionRate: number;
    revenue: number;
    bookings: number;
    conversion: number;
  };
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  bookings: number;
}

export interface OfferPerformanceData {
  offerId: string;
  title: string;
  bookings: number;
  revenue: number;
  conversionRate: number;
}

export interface BookingStatusData {
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No Show';
  count: number;
}

export interface PeakHourData {
  day: string; // e.g., 'Mon', 'Tue'
  hour: string; // e.g., '09:00', '14:00'
  intensity: number; // 0-100 score of how busy
  bookingsCount: number;
}

export interface ConversionFunnelData {
  stage: string;
  value: number;
}

export type ActivityType = 'booking_created' | 'offer_activated' | 'slot_filled' | 'booking_cancelled';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string; // ISO string
  metadata?: Record<string, any>;
}

export interface BusinessInsight {
  id: string;
  type: 'positive' | 'warning' | 'info';
  title: string;
  description: string;
  actionable?: string;
}
