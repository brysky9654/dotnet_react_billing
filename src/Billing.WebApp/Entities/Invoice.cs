using System;

namespace Billing.WebApp.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public Contact Contact { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }
        public string Notes { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Due { get; set; } = DateTime.Now;
        public DateTime Paid { get; set; } = DateTime.Now;
    }
}