using System.Threading.Tasks;

namespace Billing.WebApp.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IContactRepository ContactRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}