using System;
using System.Linq;
using System.Threading.Tasks;
using SmartOfferBooking.API.DTOs.Auth;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Models;
using SmartOfferBooking.API.Models.Enums;
using SmartOfferBooking.API.Validators.Auth;

namespace SmartOfferBooking.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtHelper _jwtHelper;

        public AuthService(IUserRepository userRepository, JwtHelper jwtHelper)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
        }

        public async Task<ApiResponse<AuthResponseDto>> RegisterAsync(RegisterDto dto)
        {
            var errors = RegisterValidator.Validate(dto);
            if (errors.Any())
            {
                return ApiResponse<AuthResponseDto>.ErrorResponse("Validation failed.", errors);
            }

            var emailExists = await _userRepository.EmailExistsAsync(dto.Email);
            if (emailExists)
            {
                return ApiResponse<AuthResponseDto>.ErrorResponse("Email is already in use.");
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = PasswordHelper.HashPassword(dto.Password),
                Role = UserRole.Admin // By default based on requirements "Register Admin"
            };

            await _userRepository.AddAsync(user);

            var token = _jwtHelper.GenerateToken(user);

            var responseDto = new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role.ToString()
                }
            };

            return ApiResponse<AuthResponseDto>.SuccessResponse(responseDto, "Registration successful");
        }

        public async Task<ApiResponse<AuthResponseDto>> LoginAsync(LoginDto dto)
        {
            var errors = LoginValidator.Validate(dto);
            if (errors.Any())
            {
                return ApiResponse<AuthResponseDto>.ErrorResponse("Validation failed.", errors);
            }

            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !PasswordHelper.VerifyPassword(dto.Password, user.PasswordHash))
            {
                return ApiResponse<AuthResponseDto>.ErrorResponse("Invalid email or password.");
            }

            var token = _jwtHelper.GenerateToken(user);

            var responseDto = new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role.ToString()
                }
            };

            return ApiResponse<AuthResponseDto>.SuccessResponse(responseDto, "Login successful");
        }

        public async Task<ApiResponse<UserDto>> GetCurrentUserAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return ApiResponse<UserDto>.ErrorResponse("User not found.");
            }

            var userDto = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role.ToString()
            };

            return ApiResponse<UserDto>.SuccessResponse(userDto, "Current user retrieved successfully");
        }
    }
}
