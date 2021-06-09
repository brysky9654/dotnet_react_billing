using System.ComponentModel.DataAnnotations;

namespace Billing.WebApp.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}