using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly DataContext _context;
        public InvoiceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesAsync()
        {
            return await _context.Invoice.ToListAsync();
        }
        public async Task<Invoice> GetInvoiceAsync(int id)
        {
            return await _context.Invoice
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        public void CreateInvoiceAsync(Invoice invoice)
        {
            _context.Invoice.Add(invoice);
        }

        public void UpdateInvoiceAsync(Invoice invoice)
        {
            _context.Invoice.Update(invoice);
        }

        public void DeleteInvoiceAsync(Invoice invoice)
        {
            _context.Invoice.Remove(invoice);
        }
    }
}