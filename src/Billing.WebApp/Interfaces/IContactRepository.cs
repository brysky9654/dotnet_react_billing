using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;

namespace Billing.WebApp.Interfaces
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetContactsAsync();
        Task<Contact> GetContactAsync(int id);
        void CreateContactAsync(Contact contact);
        void UpdateContactAsync(Contact contact);
        void DeleteContactAsync(Contact contact);
    }
}