using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var business = await EnsureBusinessAsync(context);
            await EnsureAdminUserAsync(context);
            var offers = await EnsureDemoOffersAsync(context, business.Id);
            var slots = await EnsureDemoSlotsAsync(context, offers);
            await EnsureDemoBookingsAsync(context, offers, slots);

            await context.SaveChangesAsync();
        }

        private static async Task<Business> EnsureBusinessAsync(AppDbContext context)
        {
            var business = await context.Businesses.OrderBy(b => b.CreatedAt).FirstOrDefaultAsync();
            if (business != null) return business;

            business = new Business
            {
                Id = Guid.NewGuid(),
                Name = "Willovate Test Business",
                BusinessType = BusinessType.Restaurant,
                OwnerName = "Admin User",
                Phone = "9876543210",
                Email = "admin@willovate.com",
                Address = "12 Demo Street, Central Market",
                City = "Ahmedabad",
                OpeningTime = new TimeSpan(8, 0, 0),
                ClosingTime = new TimeSpan(22, 0, 0)
            };

            await context.Businesses.AddAsync(business);
            return business;
        }

        private static async Task EnsureAdminUserAsync(AppDbContext context)
        {
            const string adminEmail = "admin@willovate.com";
            if (await context.Users.AnyAsync(u => u.Email == adminEmail)) return;

            await context.Users.AddAsync(new User
            {
                Id = Guid.NewGuid(),
                Name = "Admin User",
                Email = adminEmail,
                PasswordHash = PasswordHelper.HashPassword("Admin@123"),
                Role = UserRole.Admin
            });
        }

        private static async Task<List<Offer>> EnsureDemoOffersAsync(AppDbContext context, Guid businessId)
        {
            var demoOffers = new[]
            {
                new DemoOffer("Lunch Hour Deal", "Flat discount on weekday lunch combos for quick office breaks.", "Food", 499m, 299m, 45, 2, "Valid Monday to Friday. Dine-in only."),
                new DemoOffer("Gym Trial Slot", "One-day supervised gym trial with body assessment and trainer guidance.", "Fitness", 499m, 99m, 30, 1, "New members only. Sports shoes required."),
                new DemoOffer("Salon Happy Hour", "Hair wash, haircut, and styling package during afternoon hours.", "Beauty", 899m, 499m, 24, 1, "Prior appointment required. Add-ons charged extra."),
                new DemoOffer("Doctor Consultation Discount", "General physician consultation at a reduced walk-in fee.", "Healthcare", 700m, 399m, 18, 1, "Emergency services excluded."),
                new DemoOffer("Turf Morning Slot Offer", "Discounted football turf booking for morning practice sessions.", "Sports", 1800m, 999m, 22, 1, "Valid for one-hour slots only."),
                new DemoOffer("Coaching Demo Class", "Live demo class with faculty interaction and study-plan counselling.", "Education", 999m, 149m, 35, 1, "Demo material included."),
                new DemoOffer("Spa Relaxation Hour", "Aroma therapy back massage with steam access for weekday afternoons.", "Wellness", 1499m, 799m, 16, 1, "Not valid with other packages."),
                new DemoOffer("Gaming Zone Power Pass", "Two-hour gaming zone access with console and simulator credits.", "Entertainment", 699m, 349m, 28, 2, "Food and beverages not included."),
                new DemoOffer("Dental Checkup Camp", "Basic dental checkup, cleaning consultation, and oral care guidance.", "Healthcare", 1200m, 499m, 20, 1, "X-rays billed separately if required."),
                new DemoOffer("Cafe Evening Combo", "Coffee, sandwich, and dessert combo for evening visitors.", "Food", 599m, 349m, 40, 2, "Valid after 5 PM."),
                new DemoOffer("Yoga Sunrise Batch", "Guided yoga trial session with breathing and mobility routines.", "Fitness", 399m, 99m, 25, 1, "Bring a yoga mat."),
                new DemoOffer("Kids Activity Workshop", "Creative weekend workshop with crafts, games, and guided activities.", "Activities", 799m, 399m, 30, 2, "For ages 6 to 12.")
            };

            var existingTitles = await context.Offers.Select(o => o.Title).ToListAsync();
            foreach (var demo in demoOffers.Where(o => !existingTitles.Contains(o.Title)))
            {
                await context.Offers.AddAsync(new Offer
                {
                    Id = Guid.NewGuid(),
                    BusinessId = businessId,
                    Title = demo.Title,
                    Description = demo.Description,
                    Category = demo.Category,
                    OriginalPrice = demo.OriginalPrice,
                    OfferPrice = demo.OfferPrice,
                    DiscountPercentage = Math.Round((demo.OriginalPrice - demo.OfferPrice) / demo.OriginalPrice * 100, 2),
                    StartDate = DateTime.UtcNow.Date,
                    EndDate = DateTime.UtcNow.Date.AddDays(21),
                    StartTime = new TimeSpan(8, 0, 0),
                    EndTime = new TimeSpan(22, 0, 0),
                    TotalCapacity = demo.TotalCapacity,
                    MaxBookingPerCustomer = demo.MaxBookingPerCustomer,
                    TermsAndConditions = demo.Terms,
                    Status = OfferStatus.Active
                });
            }

            await context.SaveChangesAsync();
            return await context.Offers
                .Where(o => demoOffers.Select(d => d.Title).Contains(o.Title))
                .OrderBy(o => o.Title)
                .ToListAsync();
        }

        private static async Task<List<OfferSlot>> EnsureDemoSlotsAsync(AppDbContext context, IReadOnlyList<Offer> offers)
        {
            var allSlots = new List<OfferSlot>();
            var startTimes = new[] { new TimeSpan(10, 0, 0), new TimeSpan(17, 0, 0) };

            for (var index = 0; index < offers.Count; index++)
            {
                var offer = offers[index];
                var existingSlots = await context.OfferSlots
                    .Where(s => s.OfferId == offer.Id)
                    .OrderBy(s => s.SlotDate)
                    .ThenBy(s => s.StartTime)
                    .ToListAsync();

                allSlots.AddRange(existingSlots);
                if (existingSlots.Count >= 2) continue;

                for (var slotIndex = existingSlots.Count; slotIndex < 2; slotIndex++)
                {
                    var start = startTimes[slotIndex];
                    var capacity = Math.Max(8, offer.TotalCapacity / 2);
                    var slot = new OfferSlot
                    {
                        Id = Guid.NewGuid(),
                        OfferId = offer.Id,
                        SlotDate = DateTime.UtcNow.Date.AddDays(1 + (index % 6) + slotIndex),
                        StartTime = start,
                        EndTime = start.Add(TimeSpan.FromHours(1)),
                        Capacity = capacity,
                        BookedCount = 0,
                        AvailableCount = capacity,
                        Status = SlotStatus.Available
                    };

                    await context.OfferSlots.AddAsync(slot);
                    allSlots.Add(slot);
                }
            }

            await context.SaveChangesAsync();
            return allSlots;
        }

        private static async Task EnsureDemoBookingsAsync(AppDbContext context, IReadOnlyList<Offer> offers, IReadOnlyList<OfferSlot> slots)
        {
            if (await context.Bookings.CountAsync() >= 12) return;

            var customers = new[]
            {
                ("Aarav Mehta", "9000000001", "aarav@example.com", BookingStatus.Confirmed),
                ("Riya Shah", "9000000002", "riya@example.com", BookingStatus.Pending),
                ("Kabir Patel", "9000000003", "kabir@example.com", BookingStatus.Completed),
                ("Anaya Rao", "9000000004", "anaya@example.com", BookingStatus.Confirmed),
                ("Vivaan Iyer", "9000000005", "vivaan@example.com", BookingStatus.Pending),
                ("Myra Nair", "9000000006", "myra@example.com", BookingStatus.Confirmed),
                ("Ishaan Desai", "9000000007", "ishaan@example.com", BookingStatus.Completed),
                ("Sara Khan", "9000000008", "sara@example.com", BookingStatus.Confirmed),
                ("Dev Sharma", "9000000009", "dev@example.com", BookingStatus.Pending),
                ("Nisha Verma", "9000000010", "nisha@example.com", BookingStatus.Confirmed),
                ("Arjun Reddy", "9000000011", "arjun@example.com", BookingStatus.Completed),
                ("Tara Joshi", "9000000012", "tara@example.com", BookingStatus.Confirmed)
            };

            var availableSlots = slots.Where(s => s.AvailableCount > 0).Take(customers.Length).ToList();
            for (var i = 0; i < availableSlots.Count; i++)
            {
                var slot = availableSlots[i];
                var offer = offers.First(o => o.Id == slot.OfferId);
                var customer = customers[i];
                if (await context.Bookings.AnyAsync(b => b.CustomerPhone == customer.Item2 && b.OfferId == offer.Id)) continue;

                var peopleCount = i % 3 == 0 ? 2 : 1;
                peopleCount = Math.Min(peopleCount, slot.AvailableCount);
                if (peopleCount <= 0) continue;

                slot.BookedCount += peopleCount;
                slot.AvailableCount = slot.Capacity - slot.BookedCount;
                slot.Status = slot.AvailableCount <= 0 ? SlotStatus.Full : SlotStatus.Available;

                await context.Bookings.AddAsync(new Booking
                {
                    Id = Guid.NewGuid(),
                    BookingReference = "BKG-" + Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper(),
                    OfferId = offer.Id,
                    SlotId = slot.Id,
                    CustomerName = customer.Item1,
                    CustomerPhone = customer.Item2,
                    CustomerEmail = customer.Item3,
                    PeopleCount = peopleCount,
                    SpecialNote = i % 2 == 0 ? "Demo booking for presentation" : null,
                    Status = customer.Item4
                });
            }
        }

        private sealed record DemoOffer(
            string Title,
            string Description,
            string Category,
            decimal OriginalPrice,
            decimal OfferPrice,
            int TotalCapacity,
            int MaxBookingPerCustomer,
            string Terms);
    }
}
