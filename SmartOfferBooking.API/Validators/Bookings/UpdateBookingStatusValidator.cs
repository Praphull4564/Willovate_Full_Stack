using System;
using System.Collections.Generic;
using SmartOfferBooking.API.DTOs.Bookings;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Validators.Bookings
{
    public static class UpdateBookingStatusValidator
    {
        public static List<string> Validate(UpdateBookingStatusDto dto)
        {
            var errors = new List<string>();

            var normalizedStatus = dto.Status?.Replace(" ", string.Empty);

            if (!Enum.TryParse<BookingStatus>(normalizedStatus, true, out _))
                errors.Add($"Invalid booking status: {dto.Status}. Allowed values are: {string.Join(", ", Enum.GetNames<BookingStatus>())}");

            return errors;
        }
    }
}
