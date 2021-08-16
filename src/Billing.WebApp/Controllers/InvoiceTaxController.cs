using System.Collections.Generic;
using System.Threading.Tasks;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Billing.WebApp.Controllers
{
    public class InvoiceTaxController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public InvoiceTaxController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceTax>>> GetInvoiceTaxes()
        {
            return Ok(await _unitOfWork.InvoiceTaxRepository.GetInvoiceTaxesAsync());
        }

        [HttpGet("{id}", Name = "GetInvoiceTax")]
        public async Task<ActionResult<InvoiceTax>> GetInvoiceTaxAsync(int id)
        {
            return Ok(await _unitOfWork.InvoiceTaxRepository.GetInvoiceTaxAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<InvoiceTax>> CreateInvoiceTaxAsync(InvoiceTaxDto invoiceTaxDto)
        {
            var contact = new InvoiceTax
            {
                Name = invoiceTaxDto.Name,
                Amount = invoiceTaxDto.Amount,
                Percentage = invoiceTaxDto.Percentage
            };

            _unitOfWork.InvoiceTaxRepository.CreateInvoiceTaxAsync(contact);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetInvoiceTax", new { id = contact.Id }, contact);
            }

            return BadRequest("Unable to create tax");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<InvoiceTax>> UpdateInvoiceTaxAsync(int id, InvoiceTaxDto invoiceTaxDto)
        {
            var invoiceTax = await _unitOfWork.InvoiceTaxRepository.GetInvoiceTaxAsync(id);

            invoiceTax.Name = invoiceTaxDto.Name;
            invoiceTax.Amount = invoiceTaxDto.Amount;
            invoiceTax.Percentage = invoiceTaxDto.Percentage;

            _unitOfWork.InvoiceTaxRepository.UpdateInvoiceTaxAsync(invoiceTax);

            if (await _unitOfWork.Complete())
            {
                return Ok(invoiceTax);
            }

            return BadRequest("Unable to update tax");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InvoiceTax>> DeleteInvoiceTaxAsync(int id)
        {
            var invoiceTax = await _unitOfWork.InvoiceTaxRepository.GetInvoiceTaxAsync(id);

            _unitOfWork.InvoiceTaxRepository.DeleteInvoiceTaxAsync(invoiceTax);

            if (await _unitOfWork.Complete())
            {
                return Ok(invoiceTax);
            }

            return BadRequest("Unable to delete tax");
        }

    }
}