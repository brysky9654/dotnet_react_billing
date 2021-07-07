using System;

namespace Billing.WebApp.DTOs
{
    public class InvoiceDto
    {
        public int ContactId { get; set; }
        public int InvoiceStatusId { get; set; }
        public string Notes { get; set; }
        public string Reference { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Due { get; set; } = DateTime.Today.AddDays(7);
    }
}