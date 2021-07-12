namespace Billing.WebApp.DTOs
{
    public class InvoiceTaxDto
    {
        public string Name { get; set; }
        public float Amount { get; set; }
        public bool Percentage { get; set; } = true;
    }
}