using System;
using System.Threading;
using System.Threading.Tasks;
using Billing.WebApp.Controllers;
using Billing.WebApp.DTOs;
using Billing.WebApp.Entities;
using Billing.WebApp.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Billing.UnitTests
{
    public class AccountControllerTests
    {
        [Fact]
        public async Task RegisterAsync_WithoutUsername_ReturnsBadRequest()
        {
            // Arrange

            // var userManagerMock = new Mock<UserManager<User>>(
            //     Mock.Of<IUserStore<User>>(),
            //     null, null, null, null, null, null, null, null);

            // var signInManagerMock = new Mock<SignInManager<User>>(
            //     userManagerMock.Object,
            //     Mock.Of<IHttpContextAccessor>(),
            //     Mock.Of<IUserClaimsPrincipalFactory<User>>(),
            //     null, null, null, null);

            // userManagerMock
            //     .Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
            //     .ReturnsAsync(IdentityResult.Success);

            // userManagerMock
            //     .Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
            //     .ReturnsAsync(IdentityResult.Failed(new IdentityError { Description = "Bad Request" }));

            // userManagerMock
            //     .Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
            //     .ReturnsAsync(IdentityResult.Success);

            // var tokenServiceMock = new Mock<ITokenService>();

            // var repositoryMock = new Mock<IAccountRepository>();

            // repositoryMock.Setup(repo => repo.RegisterAsync(It.IsAny<User>(), It.IsAny<string>()))
            //     .ReturnsAsync(It.Is<IdentityResult>(y => y.Succeeded == true));

            // repositoryMock.Setup(repo => repo.AddToRoleAsync(It.IsAny<User>()))
            //     .ReturnsAsync(It.Is<IdentityResult>(y => y.Succeeded == true));

            // repositoryMock.Setup(repo => repo.GetUserAsync(It.IsAny<string>()))
            //     .ReturnsAsync(It.IsAny<User>());

            // var controller = new AccountController(tokenServiceMock.Object, repositoryMock.Object);

            // // Act
            // //repositoryMock.Verify(x => x.CreateAsync(It.IsAny<User>()), Times.Once());

            // var result = await controller.RegisterAsync(new RegisterDto()
            // {
            //     Username = "viewer@example.com",
            //     Password = "Password123"
            // });

            // Assert.IsType<UserDto>(result.Result);

            // Assert
            //Assert.IsType<BadRequestObjectResult>(result.Result);
            //Assert.IsType<UnauthorizedResult>(result.Result);
            //Assert.IsType<BadHttpRequestException>(result.Result);
            //Assert.IsType<NotFoundResult>(result.Result);
            //userManagerMock.Verify(x => x.FindByEmailAsync("viewer@example.com"), Times.Once);



        }
    }
}
