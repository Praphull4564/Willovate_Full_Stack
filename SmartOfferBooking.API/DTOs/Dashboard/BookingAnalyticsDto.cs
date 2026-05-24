using System.Collections.Generic;

namespace SmartOfferBooking.API.DTOs.Dashboard
{
    public class BookingAnalyticsDto
    {
        public Dictionary<string, int> DailyTrends { get; set; } = new();
        public Dictionary<string, int> WeeklyTrends { get; set; } = new();
        public Dictionary<string, int> MonthlyTrends { get; set; } = new();
        public Dictionary<string, int> StatusCounts { get; set; } = new();
        public Dictionary<string, int> PeakHours { get; set; } = new();
    }
}
