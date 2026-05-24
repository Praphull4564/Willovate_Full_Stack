using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using SmartOfferBooking.API.DTOs.Business;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Validators.Business
{
    public static class CreateBusinessValidator
    {
        public static List<string> Validate(CreateBusinessDto dto)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(dto.Name))
                errors.Add("Name is required.");

            if (string.IsNullOrWhiteSpace(dto.OwnerName))
                errors.Add("Owner name is required.");

            if (string.IsNullOrWhiteSpace(dto.Phone))
                errors.Add("Phone number is required.");
            else if (!Regex.IsMatch(dto.Phone, @"^\+?[1-9]\d{1,14}$"))
                errors.Add("Phone number format is invalid.");

            if (string.IsNullOrWhiteSpace(dto.Email))
                errors.Add("Email is required.");
            else if (!Regex.IsMatch(dto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase))
                errors.Add("Email format is invalid.");

            if (string.IsNullOrWhiteSpace(dto.Address))
                errors.Add("Address is required.");

            if (string.IsNullOrWhiteSpace(dto.City))
                errors.Add("City is required.");

            if (!Enum.TryParse<BusinessType>(dto.BusinessType, true, out _))
                errors.Add($"Invalid business type: {dto.BusinessType}. Allowed values are: {string.Join(", ", Enum.GetNames<BusinessType>())}");

            if (!TimeSpan.TryParse(dto.OpeningTime, out var openingTime))
                errors.Add("Opening time must be in HH:mm format.");

            if (!TimeSpan.TryParse(dto.ClosingTime, out var closingTime))
                errors.Add("Closing time must be in HH:mm format.");

            if (errors.Count == 0 && openingTime >= closingTime)
                errors.Add("Opening time must be before closing time.");

            return errors;
        }
    }
}
