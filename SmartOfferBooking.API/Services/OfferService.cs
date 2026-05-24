using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SmartOfferBooking.API.DTOs;
using SmartOfferBooking.API.DTOs.Offers;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Validators.Offers;

namespace SmartOfferBooking.API.Services
{
    public class OfferService : IOfferService
    {
        private readonly IOfferRepository _offerRepository;
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public OfferService(IOfferRepository offerRepository, IBusinessRepository businessRepository, IMapper mapper)
        {
            _offerRepository = offerRepository;
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<OfferResponseDto>> CreateAsync(CreateOfferDto dto)
        {
            var errors = CreateOfferValidator.Validate(dto);
            if (errors.Any())
                return ApiResponse<OfferResponseDto>.ErrorResponse("Validation failed.", errors);

            var businessExists = await _businessRepository.GetByIdAsync(dto.BusinessId);
            if (businessExists == null)
                return ApiResponse<OfferResponseDto>.ErrorResponse("The specified BusinessId does not exist.");

            var offer = _mapper.Map<Offer>(dto);
            
            // Auto-calculate discount percentage
            if (offer.OriginalPrice > 0)
            {
                offer.DiscountPercentage = ((offer.OriginalPrice - offer.OfferPrice) / offer.OriginalPrice) * 100;
            }

            await _offerRepository.AddAsync(offer);
            offer.Business = businessExists;

            var responseDto = _mapper.Map<OfferResponseDto>(offer);
            return ApiResponse<OfferResponseDto>.SuccessResponse(responseDto, "Offer created successfully.");
        }

        public async Task<ApiResponse<PagedResult<OfferResponseDto>>> GetPagedAsync(OfferFilterDto filter)
        {
            var pagedResult = await _offerRepository.GetPagedOffersAsync(filter);
            
            var responseDtos = _mapper.Map<IReadOnlyList<OfferResponseDto>>(pagedResult.Items);
            
            var result = new PagedResult<OfferResponseDto>(
                responseDtos, 
                pagedResult.TotalCount, 
                pagedResult.PageNumber, 
                pagedResult.PageSize
            );

            return ApiResponse<PagedResult<OfferResponseDto>>.SuccessResponse(result, "Offers retrieved successfully.");
        }

        public async Task<ApiResponse<OfferResponseDto>> GetByIdAsync(Guid id)
        {
            var offer = await _offerRepository.GetByIdAsync(id);
            if (offer == null)
                return ApiResponse<OfferResponseDto>.ErrorResponse("Offer not found.");

            var responseDto = _mapper.Map<OfferResponseDto>(offer);
            return ApiResponse<OfferResponseDto>.SuccessResponse(responseDto, "Offer retrieved successfully.");
        }

        public async Task<ApiResponse<OfferResponseDto>> UpdateAsync(Guid id, UpdateOfferDto dto)
        {
            var errors = UpdateOfferValidator.Validate(dto);
            if (errors.Any())
                return ApiResponse<OfferResponseDto>.ErrorResponse("Validation failed.", errors);

            var existingOffer = await _offerRepository.GetByIdAsync(id);
            if (existingOffer == null)
                return ApiResponse<OfferResponseDto>.ErrorResponse("Offer not found.");

            _mapper.Map(dto, existingOffer);

            // Re-calculate discount percentage
            if (existingOffer.OriginalPrice > 0)
            {
                existingOffer.DiscountPercentage = ((existingOffer.OriginalPrice - existingOffer.OfferPrice) / existingOffer.OriginalPrice) * 100;
            }

            await _offerRepository.UpdateAsync(existingOffer);

            var responseDto = _mapper.Map<OfferResponseDto>(existingOffer);
            return ApiResponse<OfferResponseDto>.SuccessResponse(responseDto, "Offer updated successfully.");
        }

        public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
        {
            var offer = await _offerRepository.GetByIdAsync(id);
            if (offer == null)
                return ApiResponse<bool>.ErrorResponse("Offer not found.");

            await _offerRepository.DeleteAsync(offer);
            return ApiResponse<bool>.SuccessResponse(true, "Offer deleted successfully.");
        }
    }
}
