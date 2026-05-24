using System.Collections.Generic;

namespace SmartOfferBooking.API.DTOs.Dashboard
{
    public class OfferPerformanceDto
    {
        public List<OfferPerformanceItemDto> MostBookedOffers { get; set; } = new();
        public List<OfferPerformanceItemDto> HighestConversionOffers { get; set; } = new();
        public double AverageOfferUtilization { get; set; }
        public int ExpiredOffersCount { get; set; }
        public int CancelledOffersCount { get; set; }
    }

    public class OfferPerformanceItemDto
    {
        public string OfferId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int TotalBookings { get; set; }
        public double ConversionRate { get; set; }
    }
}
