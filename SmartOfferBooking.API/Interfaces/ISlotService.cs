using System;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Interfaces
{
    public interface ISlotService
    {
        Task<ApiResponse<SlotResponseDto>> CreateAsync(CreateSlotDto dto);
        Task<ApiResponse<PagedResult<SlotResponseDto>>> GetPagedAsync(SlotFilterDto filter);
        Task<ApiResponse<SlotResponseDto>> GetByIdAsync(Guid id);
        Task<ApiResponse<SlotResponseDto>> UpdateAsync(Guid id, UpdateSlotDto dto);
        Task<ApiResponse<bool>> DeleteAsync(Guid id);
    }
}
