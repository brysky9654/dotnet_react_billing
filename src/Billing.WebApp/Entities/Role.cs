using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Billing.WebApp.Entities
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }

    }
}