using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;

namespace Billing.WebApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IAccountRepository _accountRepository;

        public AccountController(ITokenService tokenService, IAccountRepository accountRepository)
        {
            _tokenService = tokenService;
            _accountRepository = accountRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAsync(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username.ToLower(),
                Email = registerDto.Username.ToLower()
            };

            if (await _accountRepository.GetUserAsync(registerDto.Username) != null) return BadRequest("An account already exists with this email address");

            var result = await _accountRepository.RegisterAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _accountRepository.AddToRoleAsync(user);
            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _accountRepository.GetUserAsync(loginDto.Username);
            if (user == null) return Unauthorized("Invalid username");

            var result = await _accountRepository.LoginAsync(user, loginDto.Password);
            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }
    }
}