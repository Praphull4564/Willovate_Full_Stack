using System.Collections.Generic;
using System.Text.RegularExpressions;
using SmartOfferBooking.API.DTOs.Auth;

namespace SmartOfferBooking.API.Validators.Auth
{
    public static class RegisterValidator
    {
        public static List<string> Validate(RegisterDto dto)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(dto.Name))
                errors.Add("Name is required.");

            if (string.IsNullOrWhiteSpace(dto.Email))
                errors.Add("Email is required.");
            else if (!Regex.IsMatch(dto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase))
                errors.Add("Email format is invalid.");

            if (string.IsNullOrWhiteSpace(dto.Password))
                errors.Add("Password is required.");
            else
            {
                if (dto.Password.Length < 8)
                    errors.Add("Password must be at least 8 characters long.");
                if (!Regex.IsMatch(dto.Password, @"[A-Z]"))
                    errors.Add("Password must contain at least one uppercase letter.");
                if (!Regex.IsMatch(dto.Password, @"[a-z]"))
                    errors.Add("Password must contain at least one lowercase letter.");
                if (!Regex.IsMatch(dto.Password, @"[0-9]"))
                    errors.Add("Password must contain at least one number.");
            }

            return errors;
        }
    }
}
