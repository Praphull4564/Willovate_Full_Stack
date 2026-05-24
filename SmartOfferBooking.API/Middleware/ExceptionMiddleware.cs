using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Exceptions;

namespace SmartOfferBooking.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            int statusCode;
            string message;

            switch (exception)
            {
                case ValidationException ex:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    message = ex.Message;
                    break;
                case NotFoundException ex:
                    statusCode = (int)HttpStatusCode.NotFound;
                    message = ex.Message;
                    break;
                case UnauthorizedException ex:
                    statusCode = (int)HttpStatusCode.Unauthorized;
                    message = ex.Message;
                    break;
                case BusinessRuleException ex:
                    statusCode = (int)HttpStatusCode.UnprocessableEntity;
                    message = ex.Message;
                    break;
                default:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    message = "An internal server error occurred.";
                    break;
            }

            context.Response.StatusCode = statusCode;

            var response = ApiResponse<object>.ErrorResponse(message, new System.Collections.Generic.List<string> { exception.Message });

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);

            return context.Response.WriteAsync(json);
        }
    }
}
