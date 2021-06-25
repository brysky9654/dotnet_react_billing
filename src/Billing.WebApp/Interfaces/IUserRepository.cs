using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.Entities;

namespace Billing.WebApp.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<User>> GetUsersAsync();

        Task<User> GetUserByIdAsync(int id);

        Task<User> GetUserByEmailAsync(string email);
    }
}