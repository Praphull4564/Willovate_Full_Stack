using System;
using AutoMapper;
using SmartOfferBooking.API.DTOs.Business;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Mappings
{
    public class BusinessProfile : Profile
    {
        public BusinessProfile()
        {
            CreateMap<CreateBusinessDto, Business>()
                .ForMember(dest => dest.OpeningTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.OpeningTime)))
                .ForMember(dest => dest.ClosingTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.ClosingTime)))
                .ForMember(dest => dest.BusinessType, opt => opt.MapFrom(src => Enum.Parse<BusinessType>(src.BusinessType, true)));

            CreateMap<UpdateBusinessDto, Business>()
                .ForMember(dest => dest.OpeningTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.OpeningTime)))
                .ForMember(dest => dest.ClosingTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.ClosingTime)))
                .ForMember(dest => dest.BusinessType, opt => opt.MapFrom(src => Enum.Parse<BusinessType>(src.BusinessType, true)));

            CreateMap<Business, BusinessResponseDto>()
                .ForMember(dest => dest.OpeningTime, opt => opt.MapFrom(src => src.OpeningTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.ClosingTime, opt => opt.MapFrom(src => src.ClosingTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.BusinessType, opt => opt.MapFrom(src => src.BusinessType.ToString()));
        }
    }
}
