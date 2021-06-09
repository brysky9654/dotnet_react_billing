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

    }
}
