using Billing.WebApp.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Billing.WebApp.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<InvoiceStatus> InvoiceStatus { get; set; }
        public DbSet<InvoiceItem> InvoiceItem { get; set; }
        public DbSet<InvoiceTax> InvoiceTax { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<Role>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }
}