using System;
using System.Collections.Generic;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Models
{
    public class Business : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public BusinessType BusinessType { get; set; } = BusinessType.Other;
        public string OwnerName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }
        public string? LogoUrl { get; set; }

        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    }
}
