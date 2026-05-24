using System;
using System.Collections.Generic;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Validators.Slots
{
    public static class CreateSlotValidator
    {
        public static List<string> Validate(CreateSlotDto dto)
        {
            var errors = new List<string>();

            if (dto.OfferId == Guid.Empty)
                errors.Add("OfferId is required.");

            if (dto.SlotDate.Date < DateTime.UtcNow.Date)
                errors.Add("Slot date cannot be in the past.");

            if (!TimeSpan.TryParse(dto.StartTime, out var startTime))
                errors.Add("Start time must be in HH:mm format.");

            if (!TimeSpan.TryParse(dto.EndTime, out var endTime))
                errors.Add("End time must be in HH:mm format.");

            if (errors.Count == 0 && startTime >= endTime)
                errors.Add("Start time must be strictly before end time.");

            if (dto.Capacity <= 0)
                errors.Add("Capacity must be greater than zero.");

            if (!Enum.TryParse<SlotStatus>(dto.Status, true, out _))
                errors.Add($"Invalid slot status: {dto.Status}. Allowed values are: {string.Join(", ", Enum.GetNames<SlotStatus>())}");

            return errors;
        }
    }
}
