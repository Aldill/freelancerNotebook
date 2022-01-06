using FreelancerNotebook.Models;
using FreelancerNotebook.Services.AuthService;
using FreelancerNotebook.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FreelancerNotebook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService; 
        }


        [HttpPost]
        public ActionResult Authorize([FromBody] AuthenticateUser user)
        {
            var token = _authService.Authenticate(user.Username, user.Password);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(new { token });
        }

        [HttpGet, Authorize]
        public ActionResult Test()
        {
            var test = _userService.getUserId();
            
            return Ok(test);
        }


    }
}
