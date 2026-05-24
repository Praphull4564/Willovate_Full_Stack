using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SmartOfferBooking.API.DTOs.Business;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Validators.Business;

namespace SmartOfferBooking.API.Services
{
    public class BusinessService : IBusinessService
    {
        private readonly IBusinessRepository _businessRepository;
        private readonly IMapper _mapper;

        public BusinessService(IBusinessRepository businessRepository, IMapper mapper)
        {
            _businessRepository = businessRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<BusinessResponseDto>> CreateAsync(CreateBusinessDto dto)
        {
            var errors = CreateBusinessValidator.Validate(dto);
            if (errors.Any())
            {
                return ApiResponse<BusinessResponseDto>.ErrorResponse("Validation failed.", errors);
            }

            var business = _mapper.Map<Business>(dto);
            await _businessRepository.AddAsync(business);

            var responseDto = _mapper.Map<BusinessResponseDto>(business);
            return ApiResponse<BusinessResponseDto>.SuccessResponse(responseDto, "Business profile created successfully.");
        }

        public async Task<ApiResponse<IReadOnlyList<BusinessResponseDto>>> GetAllAsync()
        {
            var businesses = await _businessRepository.GetAllAsync();
            var responseDtos = _mapper.Map<IReadOnlyList<BusinessResponseDto>>(businesses);
            return ApiResponse<IReadOnlyList<BusinessResponseDto>>.SuccessResponse(responseDtos, "Businesses retrieved successfully.");
        }

        public async Task<ApiResponse<BusinessResponseDto>> GetByIdAsync(Guid id)
        {
            var business = await _businessRepository.GetByIdAsync(id);
            if (business == null)
            {
                return ApiResponse<BusinessResponseDto>.ErrorResponse("Business profile not found.");
            }

            var responseDto = _mapper.Map<BusinessResponseDto>(business);
            return ApiResponse<BusinessResponseDto>.SuccessResponse(responseDto, "Business profile retrieved successfully.");
        }

        public async Task<ApiResponse<BusinessResponseDto>> UpdateAsync(Guid id, UpdateBusinessDto dto)
        {
            var errors = UpdateBusinessValidator.Validate(dto);
            if (errors.Any())
            {
                return ApiResponse<BusinessResponseDto>.ErrorResponse("Validation failed.", errors);
            }

            var existingBusiness = await _businessRepository.GetByIdAsync(id);
            if (existingBusiness == null)
            {
                return ApiResponse<BusinessResponseDto>.ErrorResponse("Business profile not found.");
            }

            _mapper.Map(dto, existingBusiness);
            await _businessRepository.UpdateAsync(existingBusiness);

            var responseDto = _mapper.Map<BusinessResponseDto>(existingBusiness);
            return ApiResponse<BusinessResponseDto>.SuccessResponse(responseDto, "Business profile updated successfully.");
        }
    }
}
