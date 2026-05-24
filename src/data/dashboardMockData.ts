import type { Booking, DashboardStats, BookingTrendData, BookingStatusData, WeeklyBookingData } from '../types/dashboard.types';

export const mockDashboardStats: DashboardStats = {
  totalOffers: 24,
  activeOffers: 18,
  totalBookings: 1248,
  todayBookings: 42,
  totalCapacity: 5000,
  bookedSeats: 3420,
  availableSeats: 1580,
  conversionRate: 12.4,
  trends: {
    totalOffers: 2.5,
    activeOffers: 5.2,
    totalBookings: 14.8,
    todayBookings: -2.4,
    totalCapacity: 0,
    bookedSeats: 8.4,
    availableSeats: -4.2,
    conversionRate: 1.2,
  }
};

export const mockBookingTrends: BookingTrendData[] = [
  { date: 'Mon', bookings: 65 },
  { date: 'Tue', bookings: 85 },
  { date: 'Wed', bookings: 73 },
  { date: 'Thu', bookings: 92 },
  { date: 'Fri', bookings: 124 },
  { date: 'Sat', bookings: 145 },
  { date: 'Sun', bookings: 112 },
];

export const mockBookingStatus: BookingStatusData[] = [
  { name: 'Confirmed', value: 65, color: '#4f46e5' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'Completed', value: 10, color: '#10b981' },
  { name: 'Cancelled', value: 5, color: '#ef4444' },
];

export const mockWeeklyBookings: WeeklyBookingData[] = [
  { day: 'Mon', bookings: 40, capacity: 100 },
  { day: 'Tue', bookings: 60, capacity: 100 },
  { day: 'Wed', bookings: 45, capacity: 100 },
  { day: 'Thu', bookings: 80, capacity: 100 },
  { day: 'Fri', bookings: 95, capacity: 100 },
  { day: 'Sat', bookings: 100, capacity: 100 },
  { day: 'Sun', bookings: 85, capacity: 100 },
];

export const mockRecentBookings: Booking[] = [
  {
    id: 'BKG-001',
    customerName: 'Alice Johnson',
    offerName: 'Weekend Getaway Promo',
    slotTime: 'Oct 24, 10:00 AM',
    peopleCount: 2,
    status: 'Confirmed',
    amount: 150.00,
    createdAt: '2023-10-23T14:30:00Z'
  },
  {
    id: 'BKG-002',
    customerName: 'Michael Smith',
    offerName: 'Early Bird Special',
    slotTime: 'Oct 24, 11:30 AM',
    peopleCount: 4,
    status: 'Pending',
    amount: 240.00,
    createdAt: '2023-10-23T15:45:00Z'
  },
  {
    id: 'BKG-003',
    customerName: 'Sarah Williams',
    offerName: 'VIP Exclusive Access',
    slotTime: 'Oct 24, 02:00 PM',
    peopleCount: 1,
    status: 'Completed',
    amount: 300.00,
    createdAt: '2023-10-22T09:15:00Z'
  },
  {
    id: 'BKG-004',
    customerName: 'David Brown',
    offerName: 'Group Discount Rate',
    slotTime: 'Oct 25, 09:00 AM',
    peopleCount: 6,
    status: 'Cancelled',
    amount: 450.00,
    createdAt: '2023-10-21T18:20:00Z'
  },
  {
    id: 'BKG-005',
    customerName: 'Emily Davis',
    offerName: 'Weekend Getaway Promo',
    slotTime: 'Oct 25, 04:00 PM',
    peopleCount: 2,
    status: 'Confirmed',
    amount: 150.00,
    createdAt: '2023-10-23T19:10:00Z'
  }
];
