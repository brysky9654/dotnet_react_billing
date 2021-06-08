using Billing.WebApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}