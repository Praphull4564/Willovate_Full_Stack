using System;

namespace SmartOfferBooking.API.DTOs.Slots
{
    public class SlotFilterDto
    {
        public Guid? OfferId { get; set; }
        public DateTime? SlotDate { get; set; }
        public string? Status { get; set; }
        
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
