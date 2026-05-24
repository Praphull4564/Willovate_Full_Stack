using System;

namespace SmartOfferBooking.API.DTOs.Dashboard
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string ActivityType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid? RelatedId { get; set; }
    }
}
