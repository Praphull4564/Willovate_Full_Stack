using System;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Bookings;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IBookingService
    {
        Task<ApiResponse<BookingResponseDto>> CreateAsync(CreateBookingDto dto);
        Task<ApiResponse<PagedResult<BookingResponseDto>>> GetPagedAsync(BookingFilterDto filter);
        Task<ApiResponse<BookingResponseDto>> GetByIdAsync(Guid id);
        Task<ApiResponse<BookingResponseDto>> UpdateStatusAsync(Guid id, UpdateBookingStatusDto dto);
    }
}
