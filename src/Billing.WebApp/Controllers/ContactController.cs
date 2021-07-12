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
                FirstName = contactDto.FirstName,
                LastName = contactDto.LastName,
                BusinessName = contactDto.BusinessName,
                Email = contactDto.Email,
                Address = contactDto.Address,
                State = contactDto.State,
                City = contactDto.City,
                Country = contactDto.Country,
                Favourited = contactDto.Favourited
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

            contact.FirstName = contactDto.FirstName;
            contact.LastName = contactDto.LastName;
            contact.BusinessName = contactDto.BusinessName;
            contact.Email = contactDto.Email;
            contact.Address = contactDto.Address;
            contact.State = contactDto.State;
            contact.City = contactDto.City;
            contact.Country = contactDto.Country;
            contact.Favourited = contactDto.Favourited;

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