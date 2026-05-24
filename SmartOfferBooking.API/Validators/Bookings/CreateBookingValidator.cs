using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using SmartOfferBooking.API.DTOs.Bookings;

namespace SmartOfferBooking.API.Validators.Bookings
{
    public static class CreateBookingValidator
    {
        public static List<string> Validate(CreateBookingDto dto)
        {
            var errors = new List<string>();

            if (dto.OfferId == Guid.Empty)
                errors.Add("OfferId is required.");

            if (dto.SlotId == Guid.Empty)
                errors.Add("SlotId is required.");

            if (string.IsNullOrWhiteSpace(dto.CustomerName))
                errors.Add("CustomerName is required.");

            if (string.IsNullOrWhiteSpace(dto.CustomerPhone))
                errors.Add("CustomerPhone is required.");
            else if (!Regex.IsMatch(dto.CustomerPhone, @"^\+?[1-9]\d{1,14}$"))
                errors.Add("CustomerPhone format is invalid.");

            if (!string.IsNullOrWhiteSpace(dto.CustomerEmail) && !Regex.IsMatch(dto.CustomerEmail, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase))
                errors.Add("CustomerEmail format is invalid.");

            if (dto.PeopleCount <= 0)
                errors.Add("PeopleCount must be greater than zero.");

            return errors;
        }
    }
}
