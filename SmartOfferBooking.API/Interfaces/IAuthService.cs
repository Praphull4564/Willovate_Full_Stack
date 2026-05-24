using System;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs.Auth;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<AuthResponseDto>> RegisterAsync(RegisterDto dto);
        Task<ApiResponse<AuthResponseDto>> LoginAsync(LoginDto dto);
        Task<ApiResponse<UserDto>> GetCurrentUserAsync(Guid userId);
    }
}
