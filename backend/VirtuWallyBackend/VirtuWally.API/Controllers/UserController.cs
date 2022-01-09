using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VirtuWally.API.Dtos;
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

                    _repository.UpdateImage(user.Id,user.ImageUrl);
                }
                else
                {
                    return BadRequest(new { message = "no file" });
                }

                return Ok(_repository.GetById(user.Id));
            }
        }

        [HttpPost("settings")]
        public IActionResult UpdateUser(UpdateDto dto)
        {
            try
            {
                User checkedUser = _repository.GetById(dto.Id);
                if (!BCrypt.Net.BCrypt.Verify(dto.Password, checkedUser.HashPassword))
                {
                    throw new ArgumentException("Invalid password");
                }

                User user = new User
                {
                    Id = dto.Id,
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    HashPassword = !string.IsNullOrEmpty(dto.NewPassword)
                        ? BCrypt.Net.BCrypt.HashPassword(dto.NewPassword)
                        : ""
                };
                _repository.UpdateSettings(user, dto.NewPassword);
                return Ok(_repository.GetById(user.Id));
            }
            catch (Exception ex)
            {
                return Ok(new { message = ex.Message });
            }
        }
    }
}
