using System.Threading.Tasks;
using Billing.WebApp.Entities;

namespace Billing.WebApp.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}