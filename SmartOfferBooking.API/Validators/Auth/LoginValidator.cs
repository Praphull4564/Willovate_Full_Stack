using System.Collections.Generic;
using SmartOfferBooking.API.DTOs.Auth;

namespace SmartOfferBooking.API.Validators.Auth
{
    public static class LoginValidator
    {
        public static List<string> Validate(LoginDto dto)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(dto.Email))
                errors.Add("Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Password))
                errors.Add("Password is required.");

            return errors;
        }
    }
}
