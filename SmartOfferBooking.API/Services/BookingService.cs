using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Bookings;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;
using SmartOfferBooking.API.Validators.Bookings;

namespace SmartOfferBooking.API.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IOfferRepository _offerRepository;
        private readonly ISlotRepository _slotRepository;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BookingService(IBookingRepository bookingRepository, IOfferRepository offerRepository, ISlotRepository slotRepository, AppDbContext context, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _offerRepository = offerRepository;
            _slotRepository = slotRepository;
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResponse<BookingResponseDto>> CreateAsync(CreateBookingDto dto)
        {
            var errors = CreateBookingValidator.Validate(dto);
            if (errors.Any())
                return ApiResponse<BookingResponseDto>.ErrorResponse("Validation failed.", errors);

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var offer = await _offerRepository.GetByIdAsync(dto.OfferId);
                if (offer == null || offer.Status != OfferStatus.Active || offer.EndDate < DateTime.UtcNow.Date)
                    return ApiResponse<BookingResponseDto>.ErrorResponse("Offer is not available or has expired.");

                var slot = await _slotRepository.GetByIdAsync(dto.SlotId);
                if (slot == null || slot.OfferId != dto.OfferId)
                    return ApiResponse<BookingResponseDto>.ErrorResponse("Invalid slot specified.");

                if (slot.Status != SlotStatus.Available)
                    return ApiResponse<BookingResponseDto>.ErrorResponse($"Slot is currently {slot.Status}.");

                if (slot.SlotDate.Date < DateTime.UtcNow.Date || (slot.SlotDate.Date == DateTime.UtcNow.Date && slot.EndTime < DateTime.UtcNow.TimeOfDay))
                    return ApiResponse<BookingResponseDto>.ErrorResponse("Slot has already expired.");

                var currentBookingsCount = await _bookingRepository.GetCustomerBookingCountAsync(dto.OfferId, dto.CustomerPhone);
                if (currentBookingsCount >= offer.MaxBookingPerCustomer)
                    return ApiResponse<BookingResponseDto>.ErrorResponse($"You have reached the maximum booking limit ({offer.MaxBookingPerCustomer}) for this offer.");

                if (slot.AvailableCount < dto.PeopleCount)
                    return ApiResponse<BookingResponseDto>.ErrorResponse($"Only {slot.AvailableCount} spots are available in this slot.");

                var booking = _mapper.Map<Booking>(dto);
                booking.BookingReference = BookingReferenceGenerator.Generate();
                booking.Status = BookingStatus.Pending;

                await _bookingRepository.AddAsync(booking);

                // Update Slot Capacity
                slot.BookedCount += dto.PeopleCount;
                slot.AvailableCount = slot.Capacity - slot.BookedCount;

                if (slot.AvailableCount <= 0)
                    slot.Status = SlotStatus.Full;

                await _slotRepository.UpdateAsync(slot);

                await transaction.CommitAsync();

                booking.Offer = offer;
                slot.Offer = offer;
                booking.Slot = slot;

                var responseDto = _mapper.Map<BookingResponseDto>(booking);
                return ApiResponse<BookingResponseDto>.SuccessResponse(responseDto, "Booking created successfully.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ApiResponse<BookingResponseDto>.ErrorResponse($"An error occurred while creating booking: {ex.Message}");
            }
        }

        public async Task<ApiResponse<PagedResult<BookingResponseDto>>> GetPagedAsync(BookingFilterDto filter)
        {
            var pagedResult = await _bookingRepository.GetPagedBookingsAsync(filter);
            
            var responseDtos = _mapper.Map<IReadOnlyList<BookingResponseDto>>(pagedResult.Items);
            
            var result = new PagedResult<BookingResponseDto>(
                responseDtos, 
                pagedResult.TotalCount, 
                pagedResult.PageNumber, 
                pagedResult.PageSize
            );

            return ApiResponse<PagedResult<BookingResponseDto>>.SuccessResponse(result, "Bookings retrieved successfully.");
        }

        public async Task<ApiResponse<BookingResponseDto>> GetByIdAsync(Guid id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Offer)
                    .ThenInclude(o => o.Business)
                .Include(b => b.Slot)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null)
                return ApiResponse<BookingResponseDto>.ErrorResponse("Booking not found.");

            var responseDto = _mapper.Map<BookingResponseDto>(booking);
            return ApiResponse<BookingResponseDto>.SuccessResponse(responseDto, "Booking retrieved successfully.");
        }

        public async Task<ApiResponse<BookingResponseDto>> UpdateStatusAsync(Guid id, UpdateBookingStatusDto dto)
        {
            var errors = UpdateBookingStatusValidator.Validate(dto);
            if (errors.Any())
                return ApiResponse<BookingResponseDto>.ErrorResponse("Validation failed.", errors);

            var newStatus = Enum.Parse<BookingStatus>(dto.Status.Replace(" ", string.Empty), true);

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var booking = await _context.Bookings
                    .Include(b => b.Offer)
                        .ThenInclude(o => o.Business)
                    .Include(b => b.Slot)
                    .FirstOrDefaultAsync(b => b.Id == id);
                if (booking == null)
                    return ApiResponse<BookingResponseDto>.ErrorResponse("Booking not found.");

                // State Machine Logic
                bool isValidTransition = false;
                switch (booking.Status)
                {
                    case BookingStatus.Pending:
                        isValidTransition = newStatus == BookingStatus.Confirmed || newStatus == BookingStatus.Cancelled;
                        break;
                    case BookingStatus.Confirmed:
                        isValidTransition = newStatus == BookingStatus.Completed || newStatus == BookingStatus.Cancelled || newStatus == BookingStatus.NoShow;
                        break;
                    case BookingStatus.Cancelled:
                    case BookingStatus.Completed:
                    case BookingStatus.NoShow:
                        isValidTransition = false; // Terminal states
                        break;
                }

                if (!isValidTransition)
                    return ApiResponse<BookingResponseDto>.ErrorResponse($"Cannot transition booking from {booking.Status} to {newStatus}.");

                booking.Status = newStatus;

                // Handle Capacity Restoration
                if (newStatus == BookingStatus.Cancelled || newStatus == BookingStatus.NoShow)
                {
                    var slot = await _slotRepository.GetByIdAsync(booking.SlotId);
                    if (slot != null)
                    {
                        slot.BookedCount -= booking.PeopleCount;
                        if (slot.BookedCount < 0) slot.BookedCount = 0;
                        
                        slot.AvailableCount = slot.Capacity - slot.BookedCount;
                        
                        if (slot.AvailableCount > 0 && slot.Status == SlotStatus.Full)
                        {
                            slot.Status = SlotStatus.Available;
                        }

                        await _slotRepository.UpdateAsync(slot);
                    }
                }

                await _bookingRepository.UpdateAsync(booking);
                await transaction.CommitAsync();

                var responseDto = _mapper.Map<BookingResponseDto>(booking);
                return ApiResponse<BookingResponseDto>.SuccessResponse(responseDto, "Booking status updated successfully.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ApiResponse<BookingResponseDto>.ErrorResponse($"An error occurred while updating status: {ex.Message}");
            }
        }
    }
}
