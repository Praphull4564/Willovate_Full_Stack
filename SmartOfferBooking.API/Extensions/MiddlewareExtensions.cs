using Microsoft.AspNetCore.Builder;
using SmartOfferBooking.API.Middleware;

namespace SmartOfferBooking.API.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseEnterpriseMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseMiddleware<RequestLoggingMiddleware>();
            
            app.UseRateLimiter();
            
            return app;
        }
    }
}
