using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Repositories
{
    public class SlotRepository : GenericRepository<OfferSlot>, ISlotRepository
    {
        public SlotRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<OfferSlot>> GetPagedSlotsAsync(SlotFilterDto filter)
        {
            var query = _context.OfferSlots
                .AsNoTracking()
                .AsQueryable();

            if (filter.OfferId.HasValue && filter.OfferId.Value != Guid.Empty)
            {
                query = query.Where(s => s.OfferId == filter.OfferId.Value);
            }

            if (filter.SlotDate.HasValue)
            {
                query = query.Where(s => s.SlotDate.Date == filter.SlotDate.Value.Date);
            }

            if (!string.IsNullOrWhiteSpace(filter.Status) && Enum.TryParse<SlotStatus>(filter.Status, true, out var statusEnum))
            {
                query = query.Where(s => s.Status == statusEnum);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderBy(s => s.SlotDate)
                .ThenBy(s => s.StartTime)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new PagedResult<OfferSlot>(items, totalCount, filter.PageNumber, filter.PageSize);
        }

        public async Task<bool> HasOverlappingSlotAsync(Guid offerId, DateTime slotDate, TimeSpan startTime, TimeSpan endTime, Guid? excludeSlotId = null)
        {
            var query = _context.OfferSlots
                .Where(s => s.OfferId == offerId && s.SlotDate.Date == slotDate.Date)
                .Where(s => (startTime >= s.StartTime && startTime < s.EndTime) ||
                            (endTime > s.StartTime && endTime <= s.EndTime) ||
                            (startTime <= s.StartTime && endTime >= s.EndTime));

            if (excludeSlotId.HasValue)
            {
                query = query.Where(s => s.Id != excludeSlotId.Value);
            }

            return await query.AnyAsync();
        }
    }
}
