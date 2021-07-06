using System;

namespace Billing.WebApp.Entities
{
    public class InvoiceTax
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public bool Percentage { get; set; } = true;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;

    }
}