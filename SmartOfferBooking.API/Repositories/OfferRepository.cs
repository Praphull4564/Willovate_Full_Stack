using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Offers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Repositories
{
    public class OfferRepository : GenericRepository<Offer>, IOfferRepository
    {
        public OfferRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<Offer>> GetPagedOffersAsync(OfferFilterDto filter)
        {
            var query = _context.Offers
                .AsNoTracking()
                .Include(o => o.Business)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
            {
                query = query.Where(o => o.Title.Contains(filter.SearchTerm) || o.Description.Contains(filter.SearchTerm));
            }

            if (!string.IsNullOrWhiteSpace(filter.Category))
            {
                query = query.Where(o => o.Category.ToLower() == filter.Category.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(filter.Status) && Enum.TryParse<OfferStatus>(filter.Status, true, out var statusEnum))
            {
                query = query.Where(o => o.Status == statusEnum);
            }

            if (filter.StartDate.HasValue)
            {
                query = query.Where(o => o.StartDate >= filter.StartDate.Value);
            }

            if (filter.EndDate.HasValue)
            {
                query = query.Where(o => o.EndDate <= filter.EndDate.Value);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(o => o.CreatedAt)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            return new PagedResult<Offer>(items, totalCount, filter.PageNumber, filter.PageSize);
        }
    }
}
