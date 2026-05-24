using System;
using System.Collections.Generic;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Models
{
    public class OfferSlot : BaseEntity
    {
        public Guid OfferId { get; set; }
        public DateTime SlotDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Capacity { get; set; }
        public int BookedCount { get; set; }
        public int AvailableCount { get; set; }
        public SlotStatus Status { get; set; } = SlotStatus.Available;

        public Offer Offer { get; set; } = null!;
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
