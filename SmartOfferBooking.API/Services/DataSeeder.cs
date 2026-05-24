using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;
using SmartOfferBooking.API.Helpers;

namespace SmartOfferBooking.API.Services
{
    public class DataSeeder
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly JwtHelper _jwtHelper;

        public DataSeeder(IServiceProvider serviceProvider, JwtHelper jwtHelper)
        {
            _serviceProvider = serviceProvider;
            _jwtHelper = jwtHelper;
        }

        public async Task SeedAsync()
        {
            // Create a scoped service to get repositories
            using var scope = _serviceProvider.CreateScope();
            var userRepo = scope.ServiceProvider.GetRequiredService<IUserRepository>();

            // Check if any admin exists
            var adminExists = await userRepo.EmailExistsAsync("admin@smartoffer.com");
            if (!adminExists)
            {
                var admin = new User
                {
                    Name = "Admin",
                    Email = "admin@smartoffer.com",
                    PasswordHash = PasswordHelper.HashPassword("Admin@123"),
                    Role = UserRole.Admin
                };
                await userRepo.AddAsync(admin);
            }
        }
    }
}
