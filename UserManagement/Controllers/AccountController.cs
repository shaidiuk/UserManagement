using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactNet.Models;
using ReactNet.Services;
using System.Threading.Tasks;

namespace ReactNet.Controllers
{
    [Controller]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<LoginResponseModel>> Login([FromBody] LoginRequestModel loginModel)
        {
            LoginResponseModel response = await _accountService.Login(loginModel);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterModel user)
        {
            await _accountService.Register(user);
            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] RegisterModel user)
        {
            await _accountService.Update(user);
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            await _accountService.Logout();
            return Ok();
        }
    }
}
