using System;

namespace SmartOfferBooking.API.DTOs.Offers
{
    public class UpdateOfferDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public int TotalCapacity { get; set; }
        public int MaxBookingPerCustomer { get; set; }
        public string? TermsAndConditions { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
