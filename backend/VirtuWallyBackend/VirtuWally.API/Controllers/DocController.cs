using Microsoft.AspNetCore.Mvc;
using VirtuWally.API.Dtos.Document;
using VirtuWally.API.Services;
using VirtuWally.Data;
using System.IO;
using VirtuWally.Domain;

namespace VirtuWally.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IDocRepository _docRepository;
        private readonly JwtService _jwtService;

        public DocController(IUserRepository userRepository, ICategoryRepository categoryRepository,
            IDocRepository docRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _categoryRepository = categoryRepository;
            _docRepository = docRepository;
            _jwtService = jwtService;
        }

        [HttpPost("addDocument")]
        public IActionResult AddDocument([FromForm] AddDocumentDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                if (dto.File != null)
                {
                    MemoryStream ms = new MemoryStream();
                    dto.File.CopyTo(ms);
                    Doc doc = new Doc
                    {
                        Name = dto.Name,
                        UserId = int.Parse(dto.UserId),
                        CategoryId = int.Parse(dto.CategoryId),
                        FileData = ms.ToArray()
                    };
                    _docRepository.Add(doc);
                }
                else
                {
                    return BadRequest(new { message = "No document added!" });
                }

                return Ok(_userRepository.GetById(int.Parse(dto.UserId)));
            }
        }
    }
}
