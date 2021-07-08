namespace Billing.WebApp.DTOs
{
    public class InvoiceItemDto
    {
        public int Order { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public float TaxAmount { get; set; }
        public bool TaxPercentage { get; set; } = true;
        public bool TaxInclusive { get; set; } = true;
    }
}