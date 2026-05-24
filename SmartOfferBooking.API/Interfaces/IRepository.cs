using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
    }
}
