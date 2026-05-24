using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOfferBooking.API.Interfaces;

namespace SmartOfferBooking.API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var result = await _dashboardService.GetSummaryAsync();
            return Ok(result);
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> GetBookingAnalytics()
        {
            var result = await _dashboardService.GetBookingAnalyticsAsync();
            return Ok(result);
        }

        [HttpGet("revenue")]
        public async Task<IActionResult> GetRevenueAnalytics()
        {
            var result = await _dashboardService.GetRevenueAnalyticsAsync();
            return Ok(result);
        }

        [HttpGet("offers")]
        public async Task<IActionResult> GetOfferPerformance()
        {
            var result = await _dashboardService.GetOfferPerformanceAsync();
            return Ok(result);
        }

        [HttpGet("slots")]
        public async Task<IActionResult> GetSlotUtilization()
        {
            var result = await _dashboardService.GetSlotUtilizationAsync();
            return Ok(result);
        }

        [HttpGet("activity")]
        public async Task<IActionResult> GetRecentActivity()
        {
            var result = await _dashboardService.GetRecentActivityAsync();
            return Ok(result);
        }
    }
}
