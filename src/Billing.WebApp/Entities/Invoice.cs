using System;
using System.Collections.Generic;

namespace Billing.WebApp.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public Contact Contact { get; set; }
        public string Status { get; set; } = "DRAFT";
        public string Notes { get; set; }
        public string Reference { get; set; }
        public bool TaxInclusive { get; set; } = true;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Due { get; set; } = DateTime.Today.AddDays(7);
        public DateTime? Paid { get; set; } = null;
        public ICollection<InvoiceItem> InvoiceItems { get; set; }
    }
}