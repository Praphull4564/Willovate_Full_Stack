using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs.Business;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IBusinessService
    {
        Task<ApiResponse<BusinessResponseDto>> CreateAsync(CreateBusinessDto dto);
        Task<ApiResponse<IReadOnlyList<BusinessResponseDto>>> GetAllAsync();
        Task<ApiResponse<BusinessResponseDto>> GetByIdAsync(Guid id);
        Task<ApiResponse<BusinessResponseDto>> UpdateAsync(Guid id, UpdateBusinessDto dto);
    }
}
