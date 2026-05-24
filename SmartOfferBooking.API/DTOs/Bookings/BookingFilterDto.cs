using System;

namespace SmartOfferBooking.API.DTOs.Bookings
{
    public class BookingFilterDto
    {
        public string? Status { get; set; }
        public Guid? OfferId { get; set; }
        public DateTime? Date { get; set; }
        public string? CustomerName { get; set; }
        public string? BookingReference { get; set; }

        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
