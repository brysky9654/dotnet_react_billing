using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class InvoiceTaxRepository : IInvoiceTaxRepository
    {
        private readonly DataContext _context;
        public InvoiceTaxRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InvoiceTax>> GetInvoiceTaxesAsync()
        {
            return await _context.InvoiceTax.ToListAsync();
        }

        public async Task<InvoiceTax> GetInvoiceTaxAsync(int id)
        {
            return await _context.InvoiceTax
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        public void CreateInvoiceTaxAsync(InvoiceTax invoiceTax)
        {
            _context.InvoiceTax.Add(invoiceTax);
        }

        public void UpdateInvoiceTaxAsync(InvoiceTax invoiceTax)
        {
            _context.InvoiceTax.Update(invoiceTax);
        }

        public void DeleteInvoiceTaxAsync(InvoiceTax invoiceTax)
        {
            _context.InvoiceTax.Remove(invoiceTax);
        }
    }
}