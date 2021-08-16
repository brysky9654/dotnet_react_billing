using System;
using System.Collections.Generic;

namespace Billing.WebApp.DTOs
{
    public class InvoiceDto
    {
        public int ContactId { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public string Reference { get; set; }
        public bool TaxInclusive { get; set; } = true;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Due { get; set; } = DateTime.Today.AddDays(7);
        public DateTime? Paid { get; set; } = null;
        public ICollection<InvoiceItemDto> InvoiceItems { get; set; }
    }
}