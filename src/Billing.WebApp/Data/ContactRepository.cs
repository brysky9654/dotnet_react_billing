using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class ContactRepository : IContactRepository
    {
        private readonly DataContext _context;
        public ContactRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetContactsAsync()
        {
            return await _context.Contact.ToListAsync();
        }

        public async Task<Contact> GetContactAsync(int id)
        {
            return await _context.Contact
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        public void CreateContactAsync(Contact contact)
        {
            _context.Contact.Add(contact);
        }

        public void UpdateContactAsync(Contact contact)
        {
            _context.Contact.Update(contact);
        }

        public void DeleteContactAsync(Contact contact)
        {
            _context.Contact.Remove(contact);
        }
    }
}