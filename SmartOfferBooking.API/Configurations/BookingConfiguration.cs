using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.Property(x => x.BookingReference).IsRequired().HasMaxLength(50);
            builder.Property(x => x.CustomerName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.CustomerEmail).IsRequired().HasMaxLength(100);
            
            builder.ToTable(t => t.HasCheckConstraint("CK_Booking_PeopleCount", "\"PeopleCount\" > 0"));
            // Status Mapping
            builder.Property(b => b.Status)
                .HasConversion<string>()
                .HasMaxLength(20);

            // Indexes for Analytics and Lookups
            builder.HasIndex(x => x.BookingReference).IsUnique();
            builder.HasIndex(b => b.SlotId);
            builder.HasIndex(b => b.Status);
            builder.HasIndex(b => b.CreatedAt);
            
            builder.HasOne(b => b.Offer)
                   .WithMany()
                   .HasForeignKey(b => b.OfferId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
