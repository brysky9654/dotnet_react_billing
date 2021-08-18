using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Billing.WebApp.Controllers
{
    [Authorize]
    public class InvoiceController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly string[] _status = { "DRAFT", "PUBLISHED", "REVERSED", "DELETED" };

        public InvoiceController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return Ok(await _unitOfWork.InvoiceRepository.GetInvoicesAsync());
        }

        [HttpGet("{id}", Name = "GetInvoice")]
        public async Task<ActionResult<Invoice>> GetInvoiceAsync(int id)
        {
            return Ok(await _unitOfWork.InvoiceRepository.GetInvoiceAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<InvoiceDto>> CreateInvoiceAsync(InvoiceDto invoiceDto)
        {
            if (_status.Contains(invoiceDto.Status) == false) return Unauthorized("Incorrect invoice type");

            var contact = await _unitOfWork.ContactRepository.GetContactAsync(invoiceDto.ContactId);

            if (contact == null) return Unauthorized("Contact not found");

            var invoice = new Invoice
            {
                Contact = contact,
                Status = invoiceDto.Status,
                Notes = invoiceDto.Notes,
                Reference = invoiceDto.Reference,
                TaxInclusive = Convert.ToBoolean(invoiceDto.TaxInclusive),
                Created = invoiceDto.Created,
                Due = invoiceDto.Due,
                Paid = invoiceDto.Paid
            };

            _unitOfWork.InvoiceRepository.CreateInvoiceAsync(invoice);

            await _unitOfWork.InvoiceItemRepository.CreateInvoiceItemsAsync(invoice, invoiceDto.InvoiceItems);

            if (await _unitOfWork.Complete())
            {
                var result = new Invoice
                {
                    Id = invoice.Id,
                    Contact = invoice.Contact,
                    Status = invoice.Status,
                    Notes = invoice.Notes,
                    Reference = invoice.Reference,
                    Created = invoice.Created,
                    Due = invoice.Due,
                    Paid = invoice.Paid,
                    TaxInclusive = invoice.TaxInclusive,
                    InvoiceItems = invoice.InvoiceItems.Select(x => new InvoiceItem
                    {
                        Id = x.Id,
                        Order = x.Order,
                        Quantity = x.Quantity,
                        Price = x.Price,
                        Description = x.Description,
                        TaxAmount = x.TaxAmount,
                        TaxPercentage = x.TaxPercentage,
                        InvoiceTaxId = x.InvoiceTaxId

                    }).ToList()
                };

                return CreatedAtRoute("GetInvoice", new { id = invoice.Id }, result);
            }

            return BadRequest("Unable to create invoice");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateInvoiceAsync(int id, InvoiceDto invoiceDto)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactAsync(invoiceDto.ContactId);
            if (contact == null) return Unauthorized("Contact not found");
            var invoice = await _unitOfWork.InvoiceRepository.GetInvoiceAsync(id);
            if (invoice == null) return Unauthorized("Invoice not found");

            invoice.Contact = contact;
            invoice.Status = invoiceDto.Status;
            invoice.Notes = invoiceDto.Notes;
            invoice.Reference = invoiceDto.Reference;
            invoice.Created = invoiceDto.Created;
            invoice.Due = invoiceDto.Due;
            invoice.Paid = invoiceDto.Paid;

            _unitOfWork.InvoiceRepository.UpdateInvoiceAsync(invoice);

            var invoiceItems = await _unitOfWork.InvoiceItemRepository.GetInvoiceItemsByInvoiceAsync(invoice);
            _unitOfWork.InvoiceItemRepository.DeleteInvoiceItemsAsync(invoiceItems);
            await _unitOfWork.InvoiceItemRepository.CreateInvoiceItemsAsync(invoice, invoiceDto.InvoiceItems);

            if (await _unitOfWork.Complete())
            {
                return NoContent();
            }

            return BadRequest("Unable to update invoice");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInvoiceAsync(int id)
        {
            var invoice = await _unitOfWork.InvoiceRepository.GetInvoiceAsync(id);
            if (invoice == null) return Unauthorized("Invoice not found");

            _unitOfWork.InvoiceRepository.DeleteInvoiceAsync(invoice);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Unable to delete invoice");
        }
    }
}