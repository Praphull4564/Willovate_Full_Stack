using System.Threading.Tasks;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
    }
}
