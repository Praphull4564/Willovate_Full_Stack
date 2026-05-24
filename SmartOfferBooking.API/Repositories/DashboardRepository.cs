using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.DTOs.Dashboard;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardSummaryDto> GetSummaryAsync()
        {
            var totalOffers = await _context.Offers.AsNoTracking().CountAsync();
            var activeOffers = await _context.Offers.AsNoTracking().CountAsync(o => o.Status == OfferStatus.Active);
            
            var totalBookings = await _context.Bookings.AsNoTracking().CountAsync(b => b.Status != BookingStatus.Cancelled);
            var todayBookings = await _context.Bookings.AsNoTracking().CountAsync(b => b.CreatedAt.Date == DateTime.UtcNow.Date && b.Status != BookingStatus.Cancelled);
            
            var totalCapacity = await _context.OfferSlots
                .AsNoTracking()
                .SumAsync(s => (int?)s.Capacity) ?? 0;

            var bookedSeats = await _context.OfferSlots
                .AsNoTracking()
                .SumAsync(s => (int?)s.BookedCount) ?? 0;

            return new DashboardSummaryDto
            {
                TotalOffers = totalOffers,
                ActiveOffers = activeOffers,
                TotalBookings = totalBookings,
                TodayBookings = todayBookings,
                TotalCapacity = totalCapacity,
                BookedSeats = bookedSeats,
                AvailableSeats = totalCapacity - bookedSeats,
                ConversionRate = AnalyticsHelper.CalculateConversionRate(bookedSeats, totalCapacity)
            };
        }

        public async Task<BookingAnalyticsDto> GetBookingAnalyticsAsync()
        {
            var past7Days = DateTime.UtcNow.AddDays(-7).Date;
            
            var dailyBookings = await _context.Bookings
                .AsNoTracking()
                .Where(b => b.CreatedAt >= past7Days && b.Status != BookingStatus.Cancelled)
                .GroupBy(b => b.CreatedAt.Date)
                .Select(g => new { Date = g.Key.ToString("yyyy-MM-dd"), Count = g.Count() })
                .ToDictionaryAsync(k => k.Date, v => v.Count);

            var statusCounts = await _context.Bookings
                .AsNoTracking()
                .GroupBy(b => b.Status)
                .Select(g => new { Status = g.Key.ToString(), Count = g.Count() })
                .ToDictionaryAsync(k => k.Status, v => v.Count);

            return new BookingAnalyticsDto
            {
                DailyTrends = dailyBookings,
                StatusCounts = statusCounts
            };
        }

        public async Task<RevenueAnalyticsDto> GetRevenueAnalyticsAsync()
        {
            // Note: Since Booking doesn't store price directly, we join with Offer.
            // In a production app, Booking should store the Price at the time of booking to be immutable.
            var revenueData = await _context.Bookings
                .AsNoTracking()
                .Where(b => b.Status == BookingStatus.Completed || b.Status == BookingStatus.Confirmed)
                .Join(_context.Offers.AsNoTracking(), b => b.OfferId, o => o.Id, (b, o) => new { b, o })
                .Select(x => new { x.o.OfferPrice, x.o.Title })
                .ToListAsync();

            var totalRevenue = revenueData.Sum(x => x.OfferPrice);
            var avgValue = revenueData.Any() ? revenueData.Average(x => x.OfferPrice) : 0;

            var revenueByOffer = revenueData
                .GroupBy(x => x.Title)
                .ToDictionary(g => g.Key, g => g.Sum(x => x.OfferPrice));

            return new RevenueAnalyticsDto
            {
                TotalRevenue = totalRevenue,
                AverageBookingValue = avgValue,
                RevenueByOffer = revenueByOffer
            };
        }

        public async Task<OfferPerformanceDto> GetOfferPerformanceAsync()
        {
            var offerData = await _context.Offers
                .AsNoTracking()
                .Select(o => new OfferPerformanceItemDto
                {
                    OfferId = o.Id.ToString(),
                    Title = o.Title,
                    TotalBookings = _context.Bookings.AsNoTracking().Count(b => b.OfferId == o.Id && b.Status != BookingStatus.Cancelled)
                })
                .OrderByDescending(o => o.TotalBookings)
                .Take(5)
                .ToListAsync();

            var expiredOffers = await _context.Offers.AsNoTracking().CountAsync(o => o.Status == OfferStatus.Expired);
            var cancelledOffers = await _context.Offers.AsNoTracking().CountAsync(o => o.Status == OfferStatus.Cancelled);

            return new OfferPerformanceDto
            {
                MostBookedOffers = offerData,
                ExpiredOffersCount = expiredOffers,
                CancelledOffersCount = cancelledOffers
            };
        }

        public async Task<SlotUtilizationDto> GetSlotUtilizationAsync()
        {
            var fullyBooked = await _context.OfferSlots.AsNoTracking().CountAsync(s => s.Status == SlotStatus.Full);
            var totalSlots = await _context.OfferSlots.AsNoTracking().CountAsync();
            
            var totalCapacity = await _context.OfferSlots
                .AsNoTracking()
                .SumAsync(s => (int?)s.Capacity) ?? 0;

            var bookedSeats = await _context.OfferSlots
                .AsNoTracking()
                .SumAsync(s => (int?)s.BookedCount) ?? 0;

            var utilPercentage = AnalyticsHelper.CalculateUtilization(bookedSeats, totalCapacity);

            return new SlotUtilizationDto
            {
                CapacityUtilizationPercentage = utilPercentage,
                FullyBookedSlotsCount = fullyBooked,
                UnderutilizedSlotsCount = totalSlots - fullyBooked
            };
        }

        public async Task<List<ActivityDto>> GetRecentActivityAsync(int limit = 10)
        {
            var recentBookings = await _context.Bookings
                .AsNoTracking()
                .OrderByDescending(b => b.CreatedAt)
                .Take(limit)
                .Select(b => new ActivityDto
                {
                    Id = Guid.NewGuid(),
                    Timestamp = b.CreatedAt,
                    ActivityType = "New Booking",
                    Description = $"Booking created: {b.BookingReference} for {b.CustomerName}",
                    RelatedId = b.Id
                })
                .ToListAsync();

            var recentOffers = await _context.Offers
                .AsNoTracking()
                .OrderByDescending(o => o.CreatedAt)
                .Take(limit)
                .Select(o => new ActivityDto
                {
                    Id = Guid.NewGuid(),
                    Timestamp = o.CreatedAt,
                    ActivityType = "New Offer",
                    Description = $"Offer activated: {o.Title}",
                    RelatedId = o.Id
                })
                .ToListAsync();

            return recentBookings.Concat(recentOffers)
                .OrderByDescending(a => a.Timestamp)
                .Take(limit)
                .ToList();
        }
    }
}
