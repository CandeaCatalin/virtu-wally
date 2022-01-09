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
                ImageUrl = new byte[]{}
            };
            if (string.IsNullOrEmpty(dto.Password))
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
                MailService mailService = new MailService();
                mailService.sendEmail(returnedUser.Email,"Hello. In order to confirm your registration please access " + "https://localhost:5001/api/Authentication/activateAccount?userId=" + returnedUser.Id.ToString(), "Confirm registration!");

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
            if(user.IsActivated == false)
            {
                return BadRequest(new { message = "The account must be activated!" });
            }
            string jwt = _jwtService.Generate(user.Id);
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new {  user = user });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "Logout Successful" });
        }
        [HttpGet("activateAccount")]
        public IActionResult ActivateAccount(int userId)
        {
            _repository.VerifyRegistration(userId);
            return Ok();
        }
        [HttpPost("ForgetPasswordSendEmail")]
        public IActionResult ForgetPasswordSendEmail(ForgetPasswordSendMail dto)
        {
            User user = _repository.GetByEmail(dto.Email.ToLower());
            if (user == null)
            {
                return Ok(new { message = "User not found!" });
            }
            MailService mailService = new MailService();
            mailService.sendEmail(user.Email,"Hello. In order to change your password please access " + "http://localhost:3000/ForgetPassword/" + user.Email.ToString()+"/"+user.Id.ToString(), "Change your password!");

            return Ok(new {message = "Mail sent!"});
        }
        [HttpPost("ForgetPassword")]
        public IActionResult ForgetPassword(ForgetPasswordDto dto)
        {
            User user = _repository.GetByEmail(dto.Email.ToLower());
            if (user == null)
            {
                return Ok(new { message = "User not found!" });

            }

            user.HashPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            _repository.UpdateSettings(user,user.HashPassword);
            return Ok("Password Updated!");
        }
    }
}
