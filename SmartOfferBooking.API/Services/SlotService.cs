using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;
using SmartOfferBooking.API.Validators.Slots;

namespace SmartOfferBooking.API.Services
{
    public class SlotService : ISlotService
    {
        private readonly ISlotRepository _slotRepository;
        private readonly IOfferRepository _offerRepository;
        private readonly IMapper _mapper;

        public SlotService(ISlotRepository slotRepository, IOfferRepository offerRepository, IMapper mapper)
        {
            _slotRepository = slotRepository;
            _offerRepository = offerRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<SlotResponseDto>> CreateAsync(CreateSlotDto dto)
        {
            var errors = CreateSlotValidator.Validate(dto);
            if (errors.Any())
                return ApiResponse<SlotResponseDto>.ErrorResponse("Validation failed.", errors);

            var offerExists = await _offerRepository.GetByIdAsync(dto.OfferId);
            if (offerExists == null)
                return ApiResponse<SlotResponseDto>.ErrorResponse("The specified OfferId does not exist.");

            var startTime = TimeSpan.Parse(dto.StartTime);
            var endTime = TimeSpan.Parse(dto.EndTime);
            
            var slotDate = DateTime.SpecifyKind(dto.SlotDate.Date, DateTimeKind.Utc);
            bool hasOverlap = await _slotRepository.HasOverlappingSlotAsync(dto.OfferId, slotDate, startTime, endTime);
            if (hasOverlap)
                return ApiResponse<SlotResponseDto>.ErrorResponse("This slot overlaps with an existing slot for the same offer.");

            var slot = _mapper.Map<OfferSlot>(dto);
            
            // Initialization Logic
            slot.BookedCount = 0;
            slot.AvailableCount = slot.Capacity;

            await _slotRepository.AddAsync(slot);

            var responseDto = _mapper.Map<SlotResponseDto>(slot);
            return ApiResponse<SlotResponseDto>.SuccessResponse(responseDto, "Slot created successfully.");
        }

        public async Task<ApiResponse<PagedResult<SlotResponseDto>>> GetPagedAsync(SlotFilterDto filter)
        {
            var pagedResult = await _slotRepository.GetPagedSlotsAsync(filter);
            
            var responseDtos = _mapper.Map<IReadOnlyList<SlotResponseDto>>(pagedResult.Items);
            
            var result = new PagedResult<SlotResponseDto>(
                responseDtos, 
                pagedResult.TotalCount, 
                pagedResult.PageNumber, 
                pagedResult.PageSize
            );

            return ApiResponse<PagedResult<SlotResponseDto>>.SuccessResponse(result, "Slots retrieved successfully.");
        }

        public async Task<ApiResponse<SlotResponseDto>> GetByIdAsync(Guid id)
        {
            var slot = await _slotRepository.GetByIdAsync(id);
            if (slot == null)
                return ApiResponse<SlotResponseDto>.ErrorResponse("Slot not found.");

            // Automation Logic: Auto expire if time has passed
            if (slot.SlotDate.Date < DateTime.UtcNow.Date || (slot.SlotDate.Date == DateTime.UtcNow.Date && slot.EndTime < DateTime.UtcNow.TimeOfDay))
            {
                if (slot.Status != SlotStatus.Expired && slot.Status != SlotStatus.Cancelled)
                {
                    slot.Status = SlotStatus.Expired;
                    await _slotRepository.UpdateAsync(slot);
                }
            }

            var responseDto = _mapper.Map<SlotResponseDto>(slot);
            return ApiResponse<SlotResponseDto>.SuccessResponse(responseDto, "Slot retrieved successfully.");
        }

        public async Task<ApiResponse<SlotResponseDto>> UpdateAsync(Guid id, UpdateSlotDto dto)
        {
            var errors = UpdateSlotValidator.Validate(dto);
            if (errors.Any())
                return ApiResponse<SlotResponseDto>.ErrorResponse("Validation failed.", errors);

            var existingSlot = await _slotRepository.GetByIdAsync(id);
            if (existingSlot == null)
                return ApiResponse<SlotResponseDto>.ErrorResponse("Slot not found.");

            var startTime = TimeSpan.Parse(dto.StartTime);
            var endTime = TimeSpan.Parse(dto.EndTime);

            var slotDate = DateTime.SpecifyKind(dto.SlotDate.Date, DateTimeKind.Utc);
            bool hasOverlap = await _slotRepository.HasOverlappingSlotAsync(existingSlot.OfferId, slotDate, startTime, endTime, id);
            if (hasOverlap)
                return ApiResponse<SlotResponseDto>.ErrorResponse("This update causes an overlap with an existing slot for the same offer.");

            if (dto.Capacity < existingSlot.BookedCount)
                return ApiResponse<SlotResponseDto>.ErrorResponse($"Cannot reduce capacity below current booked count ({existingSlot.BookedCount}).");

            _mapper.Map(dto, existingSlot);

            // Automation Logic
            existingSlot.AvailableCount = existingSlot.Capacity - existingSlot.BookedCount;

            if (existingSlot.AvailableCount <= 0 && existingSlot.Status == SlotStatus.Available)
            {
                existingSlot.Status = SlotStatus.Full;
            }
            else if (existingSlot.AvailableCount > 0 && existingSlot.Status == SlotStatus.Full)
            {
                existingSlot.Status = SlotStatus.Available;
            }

            await _slotRepository.UpdateAsync(existingSlot);

            var responseDto = _mapper.Map<SlotResponseDto>(existingSlot);
            return ApiResponse<SlotResponseDto>.SuccessResponse(responseDto, "Slot updated successfully.");
        }

        public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
        {
            var slot = await _slotRepository.GetByIdAsync(id);
            if (slot == null)
                return ApiResponse<bool>.ErrorResponse("Slot not found.");

            await _slotRepository.DeleteAsync(slot);
            return ApiResponse<bool>.SuccessResponse(true, "Slot deleted successfully.");
        }
    }
}
