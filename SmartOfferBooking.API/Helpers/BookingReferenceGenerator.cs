using System;

namespace SmartOfferBooking.API.Helpers
{
    public static class BookingReferenceGenerator
    {
        public static string Generate()
        {
            var year = DateTime.UtcNow.Year;
            // Generate a random 6 character alphanumeric string
            var randomStr = Guid.NewGuid().ToString("N").Substring(0, 6).ToUpper();
            return $"BK-{year}-{randomStr}";
        }
    }
}
