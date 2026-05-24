using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOfferBooking.API.Models;

namespace SmartOfferBooking.API.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(100);
            builder.Property(x => x.PasswordHash).IsRequired();

            builder.HasIndex(x => x.Email).IsUnique();
            
            // Note: EF Core maps enums to integer implicitly, which is fine and performant. 
            // We use integer mapping for Role.
        }
    }
}
