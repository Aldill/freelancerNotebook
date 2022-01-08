using FreelancerNotebook.Models;
using FreelancerNotebook.Services;
using FreelancerNotebook.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FreelancerNotebook.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        

        [HttpGet]
        public ActionResult<User> Get()
        {
            var userId = _userService.getUserId();
            var user = _userService.Get(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new Response<User>(user, "success"));
        }

        [HttpGet("details")]
        public ActionResult<User> GetSummary()
        {
            var userId = _userService.getUserId();
            var user = _userService.Get(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new Response<User>(user, "success"));
        }

        [HttpPatch("password")]
        public ActionResult<User> UpdatePassword(ChangePassword passwords)
        {
            var userId = _userService.getUserId();
            var user = _userService.Get(userId);
            if (user.Password != passwords.Old)
            {
                return Conflict(new Response<string>("error.wrongOldPassword"));
            }

            user.Password = passwords.New; // :(( how bad is this?

            _userService.UpdatePassword(userId, user);

            return NoContent();
        }

        [HttpPost, AllowAnonymous]
        public ActionResult<User> Create(User user)
        {
           var checkuser = _userService.GetbyUsername(user.Username);
             if (checkuser != null)
            {
                return Conflict(new Response<string>("error.usernameTaken"));
            }
            checkuser = _userService.GetbyMail(user.Mail);
              if (checkuser != null)
            {
                return Conflict(new Response<string>("error.mailTaken"));
            }
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, new Response<User>( user , "success"));
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user.Password != userIn.Password)
            {
                return Unauthorized(new Response<string>("error.wrongPassword"));
            }

            if (user.Username == userIn.Username)
            {
                return Conflict(new Response<string>("error.usernameTaken"));
            }

            if (user == null)
            {
                return NotFound();
            }

            _userService.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}/data")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.Id);

            return NoContent();
        }
    }
}