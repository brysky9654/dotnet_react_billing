using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;

namespace Billing.WebApp.Interfaces
{
    public interface IInvoiceItemRepository
    {
        Task<IEnumerable<InvoiceItem>> GetInvoiceItemsByInvoiceAsync(Invoice invoice);
        void CreateInvoiceItemsAsync(Invoice invoice, IEnumerable<InvoiceItemDto> invoiceItemsDto);
        void DeleteInvoiceItemsAsync(IEnumerable<InvoiceItem> invoiceItems);
    }
}