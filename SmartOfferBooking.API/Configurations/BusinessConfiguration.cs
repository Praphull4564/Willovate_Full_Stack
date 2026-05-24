using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Configurations
{
    public class BusinessConfiguration : IEntityTypeConfiguration<Business>
    {
        public void Configure(EntityTypeBuilder<Business> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.Property(x => x.Name).IsRequired().HasMaxLength(150);
            builder.Property(x => x.OwnerName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Phone).IsRequired().HasMaxLength(20);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Address).IsRequired().HasMaxLength(250);
            builder.Property(x => x.City).IsRequired().HasMaxLength(100);

            builder.HasMany(b => b.Offers)
                   .WithOne(o => o.Business)
                   .HasForeignKey(o => o.BusinessId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
