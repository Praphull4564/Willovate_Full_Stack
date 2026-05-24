using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs.Dashboard;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IDashboardRepository
    {
        Task<DashboardSummaryDto> GetSummaryAsync();
        Task<BookingAnalyticsDto> GetBookingAnalyticsAsync();
        Task<RevenueAnalyticsDto> GetRevenueAnalyticsAsync();
        Task<OfferPerformanceDto> GetOfferPerformanceAsync();
        Task<SlotUtilizationDto> GetSlotUtilizationAsync();
        Task<List<ActivityDto>> GetRecentActivityAsync(int limit = 10);
    }
}
