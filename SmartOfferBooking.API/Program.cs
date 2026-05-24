using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using SmartOfferBooking.API.Configurations;
using SmartOfferBooking.API.Data;
using SmartOfferBooking.API.Middleware;
using SmartOfferBooking.API.Interfaces;
using SmartOfferBooking.API.Repositories;
using SmartOfferBooking.API.Services;
using SmartOfferBooking.API.Helpers;
using SmartOfferBooking.API.Extensions;
using SmartOfferBooking.API.Filters;

namespace SmartOfferBooking.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load .env file
            DotNetEnv.Env.Load();

            // Setup configuration from environment variables
            var connectionString = Environment.GetEnvironmentVariable("POSTGRES_CONNECTION_STRING");
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? "";
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "";
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "";
            var jwtExpiry = Environment.GetEnvironmentVariable("JWT_EXPIRY_MINUTES") ?? "1440";

            // Enterprise Polish Services
            builder.Services.ConfigureSecurity();
            builder.Services.ConfigureVersioning();
            builder.Services.ConfigureSwagger();
            builder.Services.AddControllers(options => 
            {
                options.Filters.Add<ValidationFilter>();
            }).ConfigureApiBehaviorOptions(options =>
            {
                // Disable default behavior so our ValidationFilter handles it
                options.SuppressModelStateInvalidFilter = true;
            });

            // Configure EF Core with PostgreSQL
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            // Configure JWT Settings
            builder.Services.Configure<JwtSettings>(options =>
            {
                options.Key = jwtKey;
                options.Issuer = jwtIssuer;
                options.Audience = jwtAudience;
                options.ExpiryMinutes = int.Parse(jwtExpiry);
            });

            // Configure Authentication & Authorization
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };
            });

            builder.Services.AddAuthorization();

            // Register Services & Repositories
            builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();
            builder.Services.AddScoped<IBusinessService, BusinessService>();
            builder.Services.AddScoped<IOfferRepository, OfferRepository>();
            builder.Services.AddScoped<IOfferService, OfferService>();
            builder.Services.AddScoped<ISlotRepository, SlotRepository>();
            builder.Services.AddScoped<ISlotService, SlotService>();
            builder.Services.AddScoped<IBookingRepository, BookingRepository>();
            builder.Services.AddScoped<IBookingService, BookingService>();
            builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
            builder.Services.AddScoped<IDashboardService, DashboardService>();
            builder.Services.AddSingleton<JwtHelper>();

            // Configure AutoMapper Placeholder
            builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(Program).Assembly));

            builder.Services.AddEndpointsApiExplorer();

            // Configure CORS (Vite dev server + common alternates)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins(
                            "http://localhost:5173",
                            "http://127.0.0.1:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            app.UseRouting();

            app.UseCors("AllowFrontend");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Smart Offer Slot Booking API v1");
                });
            }

            app.UseEnterpriseMiddleware();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            // Seed database
            SmartOfferBooking.API.Data.DbSeeder.SeedAsync(app.Services).Wait();

            app.Run();
        }
    }
}
