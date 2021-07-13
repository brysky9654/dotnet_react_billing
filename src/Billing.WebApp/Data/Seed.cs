using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Billing.WebApp.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public Seed(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        public async Task SeedData()
        {
            if (!await _userManager.Users.AnyAsync(u => u.Id == 1))
            {
                await SeedUsers();

                if (!await _context.Invoice.AnyAsync(u => u.Id == 1))
                {
                    await SeedInvoices();
                }

                if (!await _context.InvoiceTax.AnyAsync(u => u.Id == 1))
                {
                    await SeedInvoiceTaxes();
                }
            }
        }
        public async Task SeedUsers()
        {
            if (await _userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeed.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);
            if (users == null) return;

            var roles = new List<Role>
            {
                new Role{Name = "Admin"},
                new Role{Name = "Viewer"},
            };

            foreach (var role in roles)
            {
                await _roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await _userManager.CreateAsync(user, "password1");
                await _userManager.AddToRoleAsync(user, "Viewer");
            }

            var admin = new User
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
            };

            await _userManager.CreateAsync(admin, "password1");
            await _userManager.AddToRolesAsync(admin, new[] { "Admin" });
        }

        public async Task SeedInvoices()
        {
            if (await _context.Invoice.AnyAsync()) return;

            var contact = new Contact
            {
                FirstName = "John",
                LastName = "Smith",
                BusinessName = "ABC Corp",
                Email = "john.smith@example.com",
                Address = "123 Test Street",
                City = "Sydney",
                State = "New South Wales",
                Country = "Australia",
                Favourited = false
            };

            _context.Contact.Add(contact);

            var contacts = new List<Contact>
            {
                new Contact {
                    FirstName = "Sadie",
                    LastName = "Smith",
                    BusinessName = "ABC Corp",
                    Email = "sadie@example.com",
                    Address = "13 Test Street",
                    City = "Sydney",
                    State = "New South Wales",
                    Country = "Australia",
                    Favourited = false
                },
                new Contact {
                    FirstName = "Sam",
                    LastName = "Smith",
                    BusinessName = "Big Inc",
                    Email = "sandy@example.com",
                    Address = "23 York Street",
                    City = "Sydney",
                    State = "New South Wales",
                    Country = "Australia",
                    Favourited = false
                },
                new Contact {
                    FirstName = "Sally",
                    LastName = "Jones",
                    BusinessName = "ABC Corp",
                    Email = "sal@example.com",
                    Address = "21 Queen Street",
                    City = "Brisbane",
                    State = "Queensland",
                    Country = "Australia",
                    Favourited = false
                },
                new Contact {
                    FirstName = "Sandra",
                    LastName = "Hope",
                    BusinessName = "ABC Corp",
                    Email = "sandra@example.com",
                    Address = "34 Olive Road",
                    City = "Brisbane",
                    State = "Queensland",
                    Country = "Australia",
                    Favourited = true
                },
                new Contact {
                    FirstName = "Kim",
                    LastName = "Johnson",
                    BusinessName = "XYZ Co",
                    Email = "kim@example.com",
                    Address = "123 Test Street",
                    City = "Sydney",
                    State = "New South Wales",
                    Country = "Australia",
                    Favourited = false
                },
                new Contact {
                    FirstName = "Alex",
                    LastName = "Andrews",
                    BusinessName = "Big Inc",
                    Email = "alex@example.com",
                    Address = "65 Edward Street",
                    City = "Melbourne",
                    State = "Victoria",
                    Country = "Australia",
                    Favourited = true
                },
                new Contact {
                    FirstName = "Sasha",
                    LastName = "Ryan",
                    BusinessName = "XYZ Co",
                    Email = "sasha@example.com",
                    Address = "40 Ann Street",
                    City = "Brisbane",
                    State = "Queensland",
                    Country = "Australia",
                    Favourited = true
                },
                new Contact {
                    FirstName = "Zack",
                    LastName = "Park",
                    BusinessName = "ABC Corp",
                    Email = "zack@example.com",
                    Address = "26 Alfred Street",
                    City = "Melbourne",
                    State = "Victoria",
                    Country = "Australia",
                    Favourited = false
                },
                new Contact {
                    FirstName = "Charlie",
                    LastName = "Stevens",
                    BusinessName = "ABC Corp",
                    Email = "charlie@example.com",
                    Address = "32 Creek Street",
                    City = "Brisbane",
                    State = "Queensland",
                    Country = "Australia",
                    Favourited = false
                },
                new Contact {
                    FirstName = "Tom",
                    LastName = "Frank",
                    BusinessName = "Big Inc",
                    Email = "tom@example.com",
                    Address = "95 Bruce Avenue",
                    City = "Melbourne",
                    State = "Victoria",
                    Country = "Australia",
                    Favourited = true
                }
            };

            contacts.ForEach(c => _context.Contact.Add(c));

            var invoiceItems1 = new List<InvoiceItem>
            {
                new InvoiceItem {
                    Order = 1,
                    Quantity = 1,
                    Price = 10.95f,
                    Description = "Technology services",
                    TaxAmount = 10.00f
                },
                new InvoiceItem {
                    Order = 2,
                    Quantity = 2,
                    Price = 9.95f,
                    Description = "Web design services",
                    TaxAmount = 10.00f
                }
            };

            var invoiceItems2 = new List<InvoiceItem>
            {
                new InvoiceItem {
                    Order = 1,
                    Quantity = 1,
                    Price = 10.00f,
                    Description = "Technology services",
                    TaxAmount = 10.00f
                },
                new InvoiceItem {
                    Order = 2,
                    Quantity = 2,
                    Price = 5.00f,
                    Description = "Technology services",
                    TaxAmount = 10.00f
                },
                new InvoiceItem {
                    Order = 3,
                    Quantity = 1,
                    Price = 15.00f,
                    Description = "Technology services",
                    TaxAmount = 10.00f
                }
            };

            var invoiceItems3 = new List<InvoiceItem>
            {
                new InvoiceItem {
                    Order = 1,
                    Quantity = 1,
                    Price = 10.95f,
                    Description = "Technology services",
                    TaxAmount = 10.00f
                }
            };



            var invoices = new List<Invoice>
            {
                new Invoice {
                    Contact = contact,
                    Status = "PUBLISHED",
                    Notes = "Test note",
                    Reference = "A123",
                    InvoiceItems = invoiceItems1
                },
                new Invoice {
                    Contact = contact,
                    Status = "DRAFT",
                    Notes = "Test note 2",
                    Reference = "B123",
                    InvoiceItems = invoiceItems2
                },
                new Invoice {
                    Contact = contact,
                    Status = "REVERSED",
                    Notes = "Test note 3",
                    Reference = "C123",
                    InvoiceItems = invoiceItems3
                }

            };

            invoices.ForEach(i => _context.Invoice.Add(i));
            await _context.SaveChangesAsync();
        }

        public async Task SeedInvoiceTaxes()
        {
            if (await _context.InvoiceTax.AnyAsync()) return;

            var invoiceTax = new InvoiceTax
            {
                Name = "GST",
                Amount = 10.00f
            };

            _context.InvoiceTax.Add(invoiceTax);
            await _context.SaveChangesAsync();

        }

    }
}
