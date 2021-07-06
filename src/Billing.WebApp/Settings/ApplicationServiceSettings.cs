using Billing.WebApp.Data;
using Billing.WebApp.Interfaces;
using Billing.WebApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Billing.WebApp.Settings
{
    public static class ApplicationServiceSettings
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>(); // REMOVE
            services.AddScoped<IAccountRepository, AccountRepository>(); // REMOVE
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}