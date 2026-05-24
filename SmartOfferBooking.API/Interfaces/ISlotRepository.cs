using System;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Interfaces
{
    public interface ISlotRepository : IGenericRepository<OfferSlot>
    {
        Task<PagedResult<OfferSlot>> GetPagedSlotsAsync(SlotFilterDto filter);
        Task<bool> HasOverlappingSlotAsync(Guid offerId, DateTime slotDate, TimeSpan startTime, TimeSpan endTime, Guid? excludeSlotId = null);
    }
}
