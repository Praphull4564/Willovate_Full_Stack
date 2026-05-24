using System;

namespace SmartOfferBooking.API.DTOs.Bookings
{
    public class BookingResponseDto
    {
        public Guid Id { get; set; }
        public string BookingReference { get; set; } = string.Empty;
        public Guid OfferId { get; set; }
        public Guid SlotId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public int PeopleCount { get; set; }
        public string? SpecialNote { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string OfferTitle { get; set; } = string.Empty;
        public string BusinessName { get; set; } = string.Empty;
        public DateTime? SlotDate { get; set; }
        public string SlotStartTime { get; set; } = string.Empty;
        public string SlotEndTime { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = "Pending";
    }
}
