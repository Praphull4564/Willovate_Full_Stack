using System;
using AutoMapper;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;

namespace SmartOfferBooking.API.Mappings
{
    public class SlotProfile : Profile
    {
        public SlotProfile()
        {
            CreateMap<CreateSlotDto, OfferSlot>()
                .ForMember(dest => dest.SlotDate, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.SlotDate.Date, DateTimeKind.Utc)))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.StartTime)))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.EndTime)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<SlotStatus>(src.Status, true)))
                .ForMember(dest => dest.BookedCount, opt => opt.Ignore())
                .ForMember(dest => dest.AvailableCount, opt => opt.Ignore());

            CreateMap<UpdateSlotDto, OfferSlot>()
                .ForMember(dest => dest.SlotDate, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.SlotDate.Date, DateTimeKind.Utc)))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.StartTime)))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => TimeSpan.Parse(src.EndTime)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<SlotStatus>(src.Status, true)));

            CreateMap<OfferSlot, SlotResponseDto>()
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        }
    }
}
