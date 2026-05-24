export interface Booking {
  id: string;
  customerName: string;
  offerName: string;
  slotTime: string;
  peopleCount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  amount: number;
  createdAt: string;
}

export interface DashboardStats {
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
  };
}

export interface BookingTrendData {
  date: string;
  bookings: number;
}

export interface BookingStatusData {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyBookingData {
  day: string;
  bookings: number;
  capacity: number;
}
