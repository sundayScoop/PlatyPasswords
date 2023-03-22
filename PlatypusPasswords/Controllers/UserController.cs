using Microsoft.AspNetCore.Mvc;
using PlatypusPasswords.Services;

namespace PlatypusPasswords.Controllers
{
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetData([FromQuery] string uid)
        {
            try
            {
                return Ok(_userService.GetUserPasswords(uid));
            }
            catch
            {
                return Ok("--FAILED--");
            } 
        }

        [HttpPost]
        public IActionResult AddData([FromQuery] string uid, [FromForm] string data)
        {
            try
            {
                _userService.AddPassword(uid, data);
                return Ok();
            }
            catch
            {
                return Ok("--FAILED--");
            }
            
        }
        
    }
}