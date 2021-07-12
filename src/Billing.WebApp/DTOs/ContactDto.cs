namespace Billing.WebApp.DTOs
{
    public class ContactDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BusinessName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool Favourited { get; set; }
    }
}