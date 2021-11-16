using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VirtuWally.API.Services;
using VirtuWally.Data;
using VirtuWally.Domain;

namespace VirtuWally.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public UserController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpGet("")]
        public IActionResult GetUser()
        {
            User user = _jwtService.CheckIfUserIsLogged(_repository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
                return Ok(user);
        }

        [HttpPost("UploadImage")]
        public IActionResult UploadImage(IFormFile file)
        {
            User user = _jwtService.CheckIfUserIsLogged(_repository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                if (file != null)
                {
                    MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    user.ImageUrl = ms.ToArray();

                    _repository.Update(user);
                }
                else
                {
                    return BadRequest(new {message = "no file"});
                }

                return Ok(user);
            }
        }
    }
}
