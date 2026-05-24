using System;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Bookings;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IBookingRepository : IGenericRepository<Booking>
    {
        Task<PagedResult<Booking>> GetPagedBookingsAsync(BookingFilterDto filter);
        Task<int> GetCustomerBookingCountAsync(Guid offerId, string customerPhone);
    }
}
