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


        }
    }
}
