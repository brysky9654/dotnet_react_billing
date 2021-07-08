using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.Entities;

namespace Billing.WebApp.Interfaces
{
    public interface IInvoiceTaxRepository
    {
        Task<IEnumerable<InvoiceTax>> GetInvoiceTaxesAsync();
        Task<InvoiceTax> GetInvoiceTaxAsync(int id);
        void CreateInvoiceTaxAsync(InvoiceTax invoiceTax);
        void UpdateInvoiceTaxAsync(InvoiceTax invoiceTax);
        void DeleteInvoiceTaxAsync(InvoiceTax invoiceTax);
    }
}