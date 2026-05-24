using System.Collections.Generic;

namespace SmartOfferBooking.API.DTOs.Dashboard
{
    public class RevenueAnalyticsDto
    {
        public decimal TotalRevenue { get; set; }
        public decimal AverageBookingValue { get; set; }
        public double RevenueGrowthPercentage { get; set; }
        public Dictionary<string, decimal> RevenueByOffer { get; set; } = new();
        public Dictionary<string, decimal> RevenueTrends { get; set; } = new();
    }
}
