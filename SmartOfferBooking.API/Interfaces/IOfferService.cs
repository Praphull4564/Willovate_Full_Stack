using System;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Offers;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IOfferService
    {
        Task<ApiResponse<OfferResponseDto>> CreateAsync(CreateOfferDto dto);
        Task<ApiResponse<PagedResult<OfferResponseDto>>> GetPagedAsync(OfferFilterDto filter);
        Task<ApiResponse<OfferResponseDto>> GetByIdAsync(Guid id);
        Task<ApiResponse<OfferResponseDto>> UpdateAsync(Guid id, UpdateOfferDto dto);
        Task<ApiResponse<bool>> DeleteAsync(Guid id);
    }
}
