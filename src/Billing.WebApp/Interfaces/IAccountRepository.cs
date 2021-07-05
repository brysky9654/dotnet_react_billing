using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Microsoft.AspNetCore.Identity;

namespace Billing.WebApp.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> RegisterAsync(User user, string password);
        Task<IdentityResult> AddToRoleAsync(User user);
        Task<SignInResult> LoginAsync(User user, string password);
        Task<User> GetUserAsync(string email);
    }
}