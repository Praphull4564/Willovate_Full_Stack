using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Offers;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IOfferRepository : IGenericRepository<Offer>
    {
        Task<PagedResult<Offer>> GetPagedOffersAsync(OfferFilterDto filter);
    }
}
