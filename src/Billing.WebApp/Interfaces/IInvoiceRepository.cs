using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.Entities;

namespace Billing.WebApp.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<IEnumerable<Invoice>> GetInvoicesAsync();
        Task<Invoice> GetInvoiceAsync(int id);
        void CreateInvoiceAsync(Invoice invoice);
        void UpdateInvoiceAsync(Invoice invoice);
        void DeleteInvoiceAsync(Invoice invoice);
    }
}