using System;

namespace SmartOfferBooking.API.DTOs.Slots
{
    public class SlotResponseDto
    {
        public Guid Id { get; set; }
        public Guid OfferId { get; set; }
        public DateTime SlotDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public int BookedCount { get; set; }
        public int AvailableCount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
