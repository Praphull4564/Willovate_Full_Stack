using System;

namespace SmartOfferBooking.API.Helpers
{
    public static class AnalyticsHelper
    {
        public static double CalculateConversionRate(int totalBookings, int totalCapacity)
        {
            if (totalCapacity == 0) return 0;
            return Math.Round(((double)totalBookings / totalCapacity) * 100, 2);
        }

        public static double CalculateUtilization(int bookedSeats, int totalSeats)
        {
            if (totalSeats == 0) return 0;
            return Math.Round(((double)bookedSeats / totalSeats) * 100, 2);
        }
    }
}
