using System.Threading.Tasks;

namespace Billing.WebApp.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IContactRepository ContactRepository { get; }
        IInvoiceRepository InvoiceRepository { get; }
        IInvoiceItemRepository InvoiceItemRepository { get; }
        IInvoiceTaxRepository InvoiceTaxRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}