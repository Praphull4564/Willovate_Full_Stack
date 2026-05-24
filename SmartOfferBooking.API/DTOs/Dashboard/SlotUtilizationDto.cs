using System.Collections.Generic;

namespace SmartOfferBooking.API.DTOs.Dashboard
{
    public class SlotUtilizationDto
    {
        public double CapacityUtilizationPercentage { get; set; }
        public int FullyBookedSlotsCount { get; set; }
        public int UnderutilizedSlotsCount { get; set; }
        public Dictionary<string, int> PeakSlotTimings { get; set; } = new();
    }
}
