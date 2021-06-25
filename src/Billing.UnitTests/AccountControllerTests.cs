using System;
using Billing.WebApp.Controllers;
using Billing.WebApp.Entities;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;

namespace Billing.UnitTests
{
    public class AccountControllerTests
    {
        [Fact]
        public void RegisterAsync_WithoutUsername_ReturnsBadRequest()
        {
            // Arrange

            //var controller = new AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, DataContext context);

            // UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, DataContext context
            //var _mockUserManager = new Mock<UserManager>(new Mock<IUserStore<User>>().Object);

            // var dataContextStub = new Mock<DataContext>();

            // var store = new Mock<IUserStore<User>>();
            // var mgr = new Mock<UserManager<User>>(store.Object, null, null, null, null, null, null, null, null);
            // mgr.Object.UserValidators.Add(new UserValidator<User>());

            // var _contextAccessor = new Mock<IHttpContextAccessor>();
            // var _userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<ApiUser>>();

            // Mock<SignInManager>mockApiSignInManager = new Mock<ApiSignInManager>(_mockUserManager.Object,
            //             _contextAccessor.Object, _userPrincipalFactory.Object, null, null, null);

            // Act

            // Assert


        }
    }
}
