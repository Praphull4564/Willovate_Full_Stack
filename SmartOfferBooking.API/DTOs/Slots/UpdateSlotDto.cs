using System;

namespace SmartOfferBooking.API.DTOs.Slots
{
    public class UpdateSlotDto
    {
        public DateTime SlotDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
