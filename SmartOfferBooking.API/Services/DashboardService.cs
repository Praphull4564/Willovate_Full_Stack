using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs.Dashboard;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;

namespace SmartOfferBooking.API.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _repository;

        public DashboardService(IDashboardRepository repository)
        {
            _repository = repository;
        }

        public async Task<ApiResponse<DashboardSummaryDto>> GetSummaryAsync()
        {
            var summary = await _repository.GetSummaryAsync();
            return ApiResponse<DashboardSummaryDto>.SuccessResponse(summary, "Dashboard summary retrieved successfully.");
        }

        public async Task<ApiResponse<BookingAnalyticsDto>> GetBookingAnalyticsAsync()
        {
            var analytics = await _repository.GetBookingAnalyticsAsync();
            return ApiResponse<BookingAnalyticsDto>.SuccessResponse(analytics, "Booking analytics retrieved successfully.");
        }

        public async Task<ApiResponse<RevenueAnalyticsDto>> GetRevenueAnalyticsAsync()
        {
            var revenue = await _repository.GetRevenueAnalyticsAsync();
            return ApiResponse<RevenueAnalyticsDto>.SuccessResponse(revenue, "Revenue analytics retrieved successfully.");
        }

        public async Task<ApiResponse<OfferPerformanceDto>> GetOfferPerformanceAsync()
        {
            var performance = await _repository.GetOfferPerformanceAsync();
            return ApiResponse<OfferPerformanceDto>.SuccessResponse(performance, "Offer performance retrieved successfully.");
        }

        public async Task<ApiResponse<SlotUtilizationDto>> GetSlotUtilizationAsync()
        {
            var utilization = await _repository.GetSlotUtilizationAsync();
            return ApiResponse<SlotUtilizationDto>.SuccessResponse(utilization, "Slot utilization retrieved successfully.");
        }

        public async Task<ApiResponse<List<ActivityDto>>> GetRecentActivityAsync()
        {
            var activity = await _repository.GetRecentActivityAsync();
            return ApiResponse<List<ActivityDto>>.SuccessResponse(activity, "Recent activity retrieved successfully.");
        }
    }
}
