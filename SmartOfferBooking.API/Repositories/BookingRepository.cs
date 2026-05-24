using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Bookings;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Repositories
{
    public class BookingRepository : GenericRepository<Booking>, IBookingRepository
    {
        public BookingRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<Booking>> GetPagedBookingsAsync(BookingFilterDto filter)
        {
            var query = _context.Bookings
                .Include(b => b.Offer)
                    .ThenInclude(o => o.Business)
                .Include(b => b.Slot)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Status) && Enum.TryParse<BookingStatus>(filter.Status, true, out var statusEnum))
            {
                query = query.Where(b => b.Status == statusEnum);
            }

            if (filter.OfferId.HasValue && filter.OfferId.Value != Guid.Empty)
            {
                query = query.Where(b => b.OfferId == filter.OfferId.Value);
            }

            if (filter.Date.HasValue)
            {
                query = query.Where(b => b.CreatedAt.Date == filter.Date.Value.Date);
            }

            if (!string.IsNullOrWhiteSpace(filter.CustomerName))
            {
                var search = filter.CustomerName.ToLower();
                query = query.Where(b =>
                    b.CustomerName.ToLower().Contains(search) ||
                    b.CustomerPhone.ToLower().Contains(search) ||
                    b.BookingReference.ToLower().Contains(search) ||
                    b.CustomerEmail.ToLower().Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(filter.BookingReference))
            {
                query = query.Where(b => b.BookingReference.ToLower() == filter.BookingReference.ToLower());
            }

            var totalCount = await query.CountAsync();

            query = filter.Date.HasValue
                ? query.OrderBy(b => b.CreatedAt)
                : query.OrderByDescending(b => b.CreatedAt);

            var items = await query
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new PagedResult<Booking>(items, totalCount, filter.PageNumber, filter.PageSize);
        }

        public async Task<int> GetCustomerBookingCountAsync(Guid offerId, string customerPhone)
        {
            return await _context.Bookings
                .Where(b => b.OfferId == offerId && b.CustomerPhone == customerPhone && b.Status != BookingStatus.Cancelled)
                .CountAsync();
        }
    }
}
