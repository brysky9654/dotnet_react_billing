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
    public class ContactController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public ContactController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return Ok(await _unitOfWork.ContactRepository.GetContactsAsync());
        }

        [HttpGet("{id}", Name = "GetContact")]
        public async Task<ActionResult<Contact>> GetContactAsync(int id)
        {
            return Ok(await _unitOfWork.ContactRepository.GetContactAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContactAsync(ContactDto contactDto)
        {
            var contact = new Contact
            {
                Name = contactDto.Name,
                Email = contactDto.Email,
                Address = contactDto.Address,
                State = contactDto.State,
                Country = contactDto.Country
            };

            _unitOfWork.ContactRepository.CreateContactAsync(contact);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetContact", new { id = contact.Id }, contact);
            }

            return BadRequest("Unable to create contact");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContactAsync(int id, ContactDto contactDto)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactAsync(id);

            contact.Name = contactDto.Name;
            contact.Email = contactDto.Email;
            contact.Address = contactDto.Address;
            contact.State = contactDto.State;
            contact.Country = contactDto.Country;

            _unitOfWork.ContactRepository.UpdateContactAsync(contact);

            if (await _unitOfWork.Complete())
            {
                return NoContent();
            }

            return BadRequest("Unable to update contact");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContactAsync(int id)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactAsync(id);

            _unitOfWork.ContactRepository.DeleteContactAsync(contact);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Unable to delete contact");
        }
    }
}