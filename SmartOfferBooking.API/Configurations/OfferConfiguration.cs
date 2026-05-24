using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Configurations
{
    public class OfferConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.Property(x => x.Title).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Category).IsRequired().HasMaxLength(50);
            
            builder.Property(x => x.OriginalPrice).HasPrecision(18, 2);
            builder.Property(x => x.OfferPrice).HasPrecision(18, 2);
            builder.Property(x => x.DiscountPercentage).HasPrecision(5, 2);

            builder.ToTable(t => t.HasCheckConstraint("CK_Offer_Price", "\"OfferPrice\" < \"OriginalPrice\""));

            // Status Mapping
            builder.Property(o => o.Status)
                .HasConversion<string>()
                .HasMaxLength(20);

            // Indexes for Analytics
            builder.HasIndex(o => o.Status);
            builder.HasIndex(o => o.CreatedAt);

            builder.HasMany(o => o.Slots)
                   .WithOne(s => s.Offer)
                   .HasForeignKey(s => s.OfferId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
