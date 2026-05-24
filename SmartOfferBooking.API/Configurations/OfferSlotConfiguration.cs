using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Configurations
{
    public class OfferSlotConfiguration : IEntityTypeConfiguration<OfferSlot>
    {
        public void Configure(EntityTypeBuilder<OfferSlot> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.ToTable(t => t.HasCheckConstraint("CK_OfferSlot_Capacity", "\"Capacity\" > 0"));
            builder.ToTable(t => t.HasCheckConstraint("CK_OfferSlot_BookedCount", "\"BookedCount\" <= \"Capacity\""));

            // Indexes for faster lookups
            builder.HasIndex(os => os.OfferId);
            builder.HasIndex(os => os.SlotDate);

            builder.HasMany(s => s.Bookings)
                   .WithOne(b => b.Slot)
                   .HasForeignKey(b => b.SlotId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
