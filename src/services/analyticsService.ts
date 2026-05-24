import { api } from './api';
import type {
  DashboardSummary,
  RevenueDataPoint,
  OfferPerformanceData,
  BookingStatusData,
  PeakHourData,
  ConversionFunnelData,
  ActivityItem,
} from '../types/analytics.types';
import { subDays, format } from 'date-fns';
import { demoActivity, demoAdminBookings, demoDashboardSummary, demoOffers, demoRevenueTrends } from '../data/demoData';

const mapEntries = <TValue, TResult>(
  record: Record<string, TValue> | undefined,
  mapper: (key: string, value: TValue) => TResult
): TResult[] => Object.entries(record ?? {}).map(([key, value]) => mapper(key, value));

// Fallback mock generators (used when backend data is empty)
const generateMockRevenueData = (): RevenueDataPoint[] =>
  Array.from({ length: 30 }).map((_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'yyyy-MM-dd'),
    revenue: Math.floor(1500 + Math.random() * 2000 + i * 80),
    bookings: Math.floor(3 + Math.random() * 10),
  }));

const fallbackStatusCounts = (): BookingStatusData[] => {
  const counts = demoAdminBookings.reduce<Record<string, number>>((acc, booking) => {
    acc[booking.status] = (acc[booking.status] ?? 0) + 1;
    return acc;
  }, {});

  return ['Confirmed', 'Completed', 'Pending', 'Cancelled', 'No Show'].map((status) => ({
    status: status as BookingStatusData['status'],
    count: counts[status] ?? 0,
  }));
};

const fallbackPeakHoursRows: Array<[string, number[]]> = [
  ['Mon', [28, 34, 40, 55, 61]],
  ['Tue', [25, 30, 36, 48, 57]],
  ['Wed', [22, 29, 43, 58, 63]],
  ['Thu', [24, 33, 47, 62, 68]],
  ['Fri', [31, 42, 55, 72, 84]],
  ['Sat', [46, 58, 74, 88, 96]],
  ['Sun', [44, 54, 69, 82, 91]],
];

const fallbackPeakHours: PeakHourData[] = fallbackPeakHoursRows.flatMap(([day, intensities]) =>
  ['09:00', '12:00', '15:00', '18:00', '21:00'].map((hour, index) => ({
    day,
    hour,
    intensity: intensities[index],
    bookingsCount: Math.round(intensities[index] * 1.6),
  }))
);

export const analyticsService = {
  getSummary: async (): Promise<DashboardSummary> => {
    try {
      const response = await api.get('/dashboard/summary');
      const d = response.data.data ?? response.data;
      if ((d?.totalOffers ?? 0) > 0 || (d?.totalBookings ?? 0) > 0) {
        return {
          totalOffers: d.totalOffers ?? 0,
          activeOffers: d.activeOffers ?? 0,
          totalBookings: d.totalBookings ?? 0,
          todayBookings: d.todayBookings ?? 0,
          totalCapacity: d.totalCapacity ?? 0,
          bookedSeats: d.bookedSeats ?? 0,
          availableSeats: d.availableSeats ?? 0,
          conversionRate: d.conversionRate ?? 0,
          trends: {
            totalOffers: d.trends?.totalOffers ?? 0,
            activeOffers: d.trends?.activeOffers ?? 0,
            totalBookings: d.trends?.totalBookings ?? 0,
            todayBookings: d.trends?.todayBookings ?? 0,
            totalCapacity: d.trends?.totalCapacity ?? 0,
            bookedSeats: d.trends?.bookedSeats ?? 0,
            availableSeats: d.trends?.availableSeats ?? 0,
            conversionRate: d.trends?.conversionRate ?? 0,
            revenue: d.trends?.revenue ?? 0,
            bookings: d.trends?.bookings ?? d.trends?.totalBookings ?? 0,
            conversion: d.trends?.conversion ?? d.trends?.conversionRate ?? 0,
          },
        };
      }
    } catch {
      // fall through
    }
    return demoDashboardSummary;
  },

  getRevenueTrends: async (): Promise<RevenueDataPoint[]> => {
    try {
      const [bookingResponse, revenueResponse] = await Promise.all([
        api.get('/dashboard/bookings'),
        api.get('/dashboard/revenue'),
      ]);
      const bookingData = bookingResponse.data.data ?? bookingResponse.data;
      const revenueData = revenueResponse.data.data ?? revenueResponse.data;

      const bookingsByDate = bookingData?.dailyTrends ?? {};
      const revenueByDate = revenueData?.revenueTrends ?? {};
      const allDates = Array.from(new Set([
        ...Object.keys(bookingsByDate),
        ...Object.keys(revenueByDate),
      ])).sort();

      if (allDates.length > 0) {
        return allDates.map((date) => ({
          date,
          bookings: Number(bookingsByDate[date] ?? 0),
          revenue: Number(revenueByDate[date] ?? 0),
        }));
      }
    } catch {
      // fall through to mock
    }
    return demoRevenueTrends.length > 0 ? demoRevenueTrends : generateMockRevenueData();
  },

  getOfferPerformance: async (): Promise<OfferPerformanceData[]> => {
    try {
      const response = await api.get('/dashboard/offers');
      const d = response.data.data ?? response.data;
      if (Array.isArray(d?.mostBookedOffers) && d.mostBookedOffers.length > 0) {
        return d.mostBookedOffers.map((offer: any) => ({
          offerId: offer.offerId,
          title: offer.title,
          bookings: Number(offer.totalBookings ?? 0),
          revenue: Number(offer.totalBookings ?? 0) * (demoOffers.find((item) => item.title === offer.title)?.offerPrice ?? 299),
          conversionRate: Number(offer.conversionRate ?? 0),
        }));
      }
    } catch {
      // fall through to mock
    }
    return demoOffers
      .slice(0, 6)
      .map((offer, index) => ({
        offerId: offer.id,
        title: offer.title,
        bookings: 34 - index * 4,
        revenue: (34 - index * 4) * offer.offerPrice,
        conversionRate: 42 - index * 3.5,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  },

  getBookingStatusBreakdown: async (): Promise<BookingStatusData[]> => {
    try {
      const response = await api.get('/dashboard/bookings');
      const d = response.data.data ?? response.data;
      if (d?.statusCounts) {
        return mapEntries(d.statusCounts, (status, count) => ({
          status: status === 'NoShow' ? 'No Show' : status,
          count: Number(count),
        })) as BookingStatusData[];
      }
    } catch {
      // fall through
    }
    return fallbackStatusCounts();
  },

  getPeakHours: async (): Promise<PeakHourData[]> => {
    return fallbackPeakHours;
  },

  getConversionFunnel: async (): Promise<ConversionFunnelData[]> => [
    { stage: 'Views', value: 12840 },
    { stage: 'Opened Offer', value: 6240 },
    { stage: 'Selected Slot', value: 2860 },
    { stage: 'Completed Booking', value: 1420 },
  ],

  getActivityFeed: async (): Promise<ActivityItem[]> => {
    try {
      const response = await api.get('/dashboard/activity');
      const d = response.data.data ?? response.data;
      if (Array.isArray(d)) {
        return d.map((activity: any) => ({
          id: activity.id,
          type: activity.activityType === 'New Offer' ? 'offer_activated' : 'booking_created',
          title: activity.activityType,
          description: activity.description,
          timestamp: activity.timestamp,
          metadata: activity.relatedId ? { relatedId: activity.relatedId } : undefined,
        }));
      }
    } catch {
      // fall through
    }
    return demoActivity;
  },
};
