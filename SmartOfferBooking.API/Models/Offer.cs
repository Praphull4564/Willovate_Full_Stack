using System;
using System.Collections.Generic;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Models
{
    public class Offer : BaseEntity
    {
        public Guid BusinessId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int TotalCapacity { get; set; }
        public int MaxBookingPerCustomer { get; set; }
        public string? TermsAndConditions { get; set; }
        public OfferStatus Status { get; set; } = OfferStatus.Draft;

        public Business Business { get; set; } = null!;
        public ICollection<OfferSlot> Slots { get; set; } = new List<OfferSlot>();
    }
}
