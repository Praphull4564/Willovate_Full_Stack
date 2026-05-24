using AutoMapper;
using SmartOfferBooking.API.DTOs.Bookings;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Mappings
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<CreateBookingDto, Booking>()
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.BookingReference, opt => opt.Ignore());

            CreateMap<Booking, BookingResponseDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status == BookingStatus.NoShow ? "No Show" : src.Status.ToString()))
                .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.Offer != null ? src.PeopleCount * src.Offer.OfferPrice : 0))
                .ForMember(dest => dest.OfferTitle, opt => opt.MapFrom(src => src.Offer != null ? src.Offer.Title : string.Empty))
                .ForMember(dest => dest.BusinessName, opt => opt.MapFrom(src => src.Offer != null && src.Offer.Business != null ? src.Offer.Business.Name : string.Empty))
                .ForMember(dest => dest.SlotDate, opt => opt.MapFrom(src => src.Slot != null ? src.Slot.SlotDate : (System.DateTime?)null))
                .ForMember(dest => dest.SlotStartTime, opt => opt.MapFrom(src => src.Slot != null ? src.Slot.StartTime.ToString(@"hh\:mm") : string.Empty))
                .ForMember(dest => dest.SlotEndTime, opt => opt.MapFrom(src => src.Slot != null ? src.Slot.EndTime.ToString(@"hh\:mm") : string.Empty));
        }
    }
}
