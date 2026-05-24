using System;

namespace SmartOfferBooking.API.DTOs.Slots
{
    public class CreateSlotDto
    {
        public Guid OfferId { get; set; }
        public DateTime SlotDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
