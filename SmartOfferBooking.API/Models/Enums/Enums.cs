namespace SmartOfferBooking.API.Models.Enums
{
    public enum UserRole
    {
        Customer = 0,
        Business = 1,
        Admin = 2
    }

    public enum OfferStatus
    {
        Draft = 0,
        Active = 1,
        Paused = 2,
        Expired = 3,
        Cancelled = 4
    }

    public enum SlotStatus
    {
        Available = 0,
        Full = 1,
        Closed = 2,
        Expired = 3,
        Cancelled = 4
    }

    public enum BookingStatus
    {
        Pending = 0,
        Confirmed = 1,
        Cancelled = 2,
        Completed = 3,
        NoShow = 4
    }

    public enum BusinessType
    {
        Restaurant = 0,
        Salon = 1,
        Fitness = 2,
        Retail = 3,
        Consulting = 4,
        Other = 5
    }
}
