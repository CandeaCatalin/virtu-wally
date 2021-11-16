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
    public class CategoryController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly JwtService _jwtService;

        public CategoryController(IUserRepository userRepository, ICategoryRepository categoryRepository,
            JwtService jwtService)
        {
            _userRepository = userRepository;
            _categoryRepository = categoryRepository;
            _jwtService = jwtService;
        }

        [HttpPost("delete")]
        public IActionResult DeleteCategory(DeleteDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                _categoryRepository.Remove(dto.CategoryId);
                _userRepository.GetById(dto.UserId);
                return Ok(_userRepository.GetById(dto.UserId));
            }
        }
    }
}
