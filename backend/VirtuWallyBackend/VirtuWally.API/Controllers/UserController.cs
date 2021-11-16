using System;
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
            try
            {
                string jwt = Request.Cookies["jwt"];
                System.IdentityModel.Tokens.Jwt.JwtSecurityToken token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);
                User user = _repository.GetById(userId);
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpGet("UploadImage")]
        public IActionResult UploadImage(IFormFile file)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                System.IdentityModel.Tokens.Jwt.JwtSecurityToken token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);
                User user = _repository.GetById(userId);
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}
