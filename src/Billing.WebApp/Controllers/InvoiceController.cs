using System.Collections.Generic;
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
        public async Task<ActionResult<Invoice>> CreateInvoiceAsync(InvoiceDto invoiceDto)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactAsync(invoiceDto.ContactId);

            var invoice = new Invoice
            {
                Contact = contact,
                Status = invoiceDto.Status,
                Notes = invoiceDto.Notes,
                Reference = invoiceDto.Reference
            };

            _unitOfWork.InvoiceRepository.CreateInvoiceAsync(invoice);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetInvoice", new { id = invoice.Id }, invoice);
            }

            return BadRequest("Unable to create invoice");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateInvoiceAsync(int id, InvoiceDto invoiceDto)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactAsync(invoiceDto.ContactId);
            var invoice = await _unitOfWork.InvoiceRepository.GetInvoiceAsync(id);

            invoice.Contact = contact;
            invoice.Status = invoiceDto.Status;
            invoice.Notes = invoiceDto.Notes;
            invoice.Reference = invoiceDto.Reference;

            _unitOfWork.InvoiceRepository.UpdateInvoiceAsync(invoice);

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

            _unitOfWork.InvoiceRepository.DeleteInvoiceAsync(invoice);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Unable to delete invoice");
        }
    }
}