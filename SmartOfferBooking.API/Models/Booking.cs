using System;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Models
{
    public class Booking : BaseEntity
    {
        public string BookingReference { get; set; } = string.Empty;
        public Guid OfferId { get; set; }
        public Guid SlotId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public int PeopleCount { get; set; }
        public string? SpecialNote { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Pending;

        public Offer Offer { get; set; } = null!;
        public OfferSlot Slot { get; set; } = null!;
    }
}
