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
        public IActionResult DeleteCategory(DeleteCategoryDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                _categoryRepository.Remove(dto.CategoryId);
                return Ok(_userRepository.GetById(dto.UserId));
            }
        }

        [HttpPost("add")]
        public IActionResult AddCategory(AddCategoryDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                Category category = new Category
                {
                    Name = dto.Name,
                    UserId = dto.UserId,
                };
                _categoryRepository.Add(category);
                return Ok(_userRepository.GetById(dto.UserId));
            }
        }
    }
}
