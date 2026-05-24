using System;
using System.Collections.Generic;
using SmartOfferBooking.API.DTOs.Offers;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Validators.Offers
{
    public static class UpdateOfferValidator
    {
        public static List<string> Validate(UpdateOfferDto dto)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(dto.Title))
                errors.Add("Title is required.");

            if (string.IsNullOrWhiteSpace(dto.Category))
                errors.Add("Category is required.");

            if (dto.OriginalPrice <= 0)
                errors.Add("Original price must be greater than zero.");

            if (dto.OfferPrice < 0)
                errors.Add("Offer price cannot be negative.");

            if (dto.OfferPrice >= dto.OriginalPrice)
                errors.Add("Offer price must be strictly less than original price.");

            if (dto.EndDate < dto.StartDate)
                errors.Add("End date must be greater than or equal to start date.");

            if (!TimeSpan.TryParse(dto.StartTime, out var startTime))
                errors.Add("Start time must be in HH:mm format.");

            if (!TimeSpan.TryParse(dto.EndTime, out var endTime))
                errors.Add("End time must be in HH:mm format.");

            if (errors.Count == 0 && startTime >= endTime)
                errors.Add("Start time must be strictly before end time.");

            if (dto.TotalCapacity <= 0)
                errors.Add("Total capacity must be greater than zero.");

            if (dto.MaxBookingPerCustomer <= 0)
                errors.Add("Max booking per customer must be greater than zero.");

            if (dto.MaxBookingPerCustomer > dto.TotalCapacity)
                errors.Add("Max booking per customer cannot exceed total capacity.");

            if (!Enum.TryParse<OfferStatus>(dto.Status, true, out _))
                errors.Add($"Invalid offer status: {dto.Status}. Allowed values are: {string.Join(", ", Enum.GetNames<OfferStatus>())}");

            return errors;
        }
    }
}
