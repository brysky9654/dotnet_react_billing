namespace Billing.WebApp.DTOs
{
    public class InvoiceTaxDto
    {
        public string Name { get; set; }
        public int Amount { get; set; }
        public bool Percentage { get; set; } = true;
    }
}