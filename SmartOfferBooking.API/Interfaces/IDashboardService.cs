using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs.Dashboard;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IDashboardService
    {
        Task<ApiResponse<DashboardSummaryDto>> GetSummaryAsync();
        Task<ApiResponse<BookingAnalyticsDto>> GetBookingAnalyticsAsync();
        Task<ApiResponse<RevenueAnalyticsDto>> GetRevenueAnalyticsAsync();
        Task<ApiResponse<OfferPerformanceDto>> GetOfferPerformanceAsync();
        Task<ApiResponse<SlotUtilizationDto>> GetSlotUtilizationAsync();
        Task<ApiResponse<List<ActivityDto>>> GetRecentActivityAsync();
    }
}
