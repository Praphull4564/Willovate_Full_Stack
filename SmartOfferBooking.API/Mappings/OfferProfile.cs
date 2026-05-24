using System;
using AutoMapper;
using SmartOfferBooking.API.DTOs.Offers;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Mappings
{
    public class OfferProfile : Profile
    {
        public OfferProfile()
        {
            CreateMap<CreateOfferDto, Offer>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.StartDate.Date, DateTimeKind.Utc)))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.EndDate.Date, DateTimeKind.Utc)))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.StartTime)))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.EndTime)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<OfferStatus>(src.Status, true)))
                .ForMember(dest => dest.DiscountPercentage, opt => opt.Ignore()); // Will be calculated in service

            CreateMap<UpdateOfferDto, Offer>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.StartDate.Date, DateTimeKind.Utc)))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.EndDate.Date, DateTimeKind.Utc)))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.StartTime)))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.EndTime)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<OfferStatus>(src.Status, true)))
                .ForMember(dest => dest.DiscountPercentage, opt => opt.Ignore()); // Will be calculated in service

            CreateMap<Offer, OfferResponseDto>()
                .ForMember(dest => dest.BusinessName, opt => opt.MapFrom(src => src.Business != null ? src.Business.Name : string.Empty))
                .ForMember(dest => dest.BusinessType, opt => opt.MapFrom(src => src.Business != null ? src.Business.BusinessType.ToString() : string.Empty))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        }
    }
}
