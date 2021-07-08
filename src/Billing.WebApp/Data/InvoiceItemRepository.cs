using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class InvoiceItemRepository : IInvoiceItemRepository
    {
        private readonly DataContext _context;
        public InvoiceItemRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InvoiceItem>> GetInvoiceItemsByInvoiceAsync(Invoice invoice)
        {
            return await _context.InvoiceItem
                .Where(x => x.Invoice == invoice)
                .ToListAsync();
        }

        public void CreateInvoiceItemsAsync(Invoice invoice, IEnumerable<InvoiceItemDto> invoiceItemsDto)
        {
            foreach (var invoiceItemDto in invoiceItemsDto)
            {
                var invoiceItem = new InvoiceItem
                {
                    Invoice = invoice,
                    Order = invoiceItemDto.Order,
                    Quantity = invoiceItemDto.Quantity,
                    Price = invoiceItemDto.Price,
                    Description = invoiceItemDto.Description,
                    TaxAmount = invoiceItemDto.TaxAmount,
                    TaxPercentage = invoiceItemDto.TaxPercentage,
                    TaxInclusive = invoiceItemDto.TaxInclusive
                };

                _context.InvoiceItem.Add(invoiceItem);
            }
        }

        public void DeleteInvoiceItemsAsync(IEnumerable<InvoiceItem> invoiceItems)
        {
            foreach (var invoiceItem in invoiceItems)
            {
                _context.InvoiceItem.Remove(invoiceItem);
            }
        }

    }
}