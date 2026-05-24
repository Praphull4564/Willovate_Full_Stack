using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Repositories
{
    public class BusinessRepository : GenericRepository<Business>, IBusinessRepository
    {
        public BusinessRepository(AppDbContext context) : base(context)
        {
        }
    }
}
