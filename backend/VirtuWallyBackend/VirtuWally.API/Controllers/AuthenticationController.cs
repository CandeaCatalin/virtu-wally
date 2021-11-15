using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using VirtuWally.API.Dtos;
using VirtuWally.API.Services;
using VirtuWally.Data;
using VirtuWally.Domain;

namespace VirtuWally.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        public AuthenticationController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            User user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                HashPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Email = dto.Email.ToLower(),
                ImageUrl = ""
            };
            if (dto.Password == null || dto.Password == "")
            {
                user.HashPassword = null;
            }
            try
            {
         
                User returnedUser = _repository.Create(user);
                string jwt = _jwtService.Generate(returnedUser.Id);
                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true
                });
                return Created("success", returnedUser);
            }
            catch (FormatException e)
            {
                return Ok(new { message = e.Message });
            }
            catch (Exception)
            {
                return Ok(new { message = "Email already exists" });
            }
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            User user = _repository.GetByEmail(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.HashPassword))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            string jwt = _jwtService.Generate(user.Id);
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new { message = "success", user = user });
        }
        [HttpGet("user")]
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
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "Logout Successful" });
        }
    }
}
