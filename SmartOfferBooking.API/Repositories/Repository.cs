using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Repositories
{
    public class Repository<T> : GenericRepository<T>, IRepository<T> where T : BaseEntity
    {
        public Repository(AppDbContext context) : base(context)
        {
        }
    }
}
