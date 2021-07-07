using System.Threading.Tasks;
using Billing.WebApp.Interfaces;

namespace Billing.WebApp.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public IUserRepository UserRepository => new UserRepository(_context);
        public IContactRepository ContactRepository => new ContactRepository(_context);
        public IInvoiceRepository InvoiceRepository => new InvoiceRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            _context.ChangeTracker.DetectChanges();
            var changes = _context.ChangeTracker.HasChanges();

            return changes;
        }

    }
}