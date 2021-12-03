using System;
using Microsoft.AspNetCore.Mvc;
using VirtuWally.API.Dtos.Document;
using VirtuWally.API.Services;
using VirtuWally.Data;
using System.IO;
using VirtuWally.Data.Repositories;
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

        [HttpPost("delete")]
        public IActionResult DeleteDocument(DeleteDocDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                _docRepository.Remove(dto.DocId);
                return Ok(_userRepository.GetById(dto.UserId));
            }
        }

        [HttpPost("add")]
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

        [HttpPost("edit")]
        public IActionResult EditDocument([FromForm] EditDocumentDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                Doc newDoc = new Doc
                {
                    Id = int.Parse(dto.Id),
                    Name = dto.Name != null ? dto.Name:"",
                    CategoryId =dto.CategoryId.Length!=0? int.Parse(dto.CategoryId):0,
                };
                if (dto.File != null)
                {
                    MemoryStream ms = new MemoryStream();
                    dto.File.CopyTo(ms);
                    newDoc.FileData = ms.ToArray();
                }
                else
                {
                    newDoc.FileData = Array.Empty<byte>();
                }
                _docRepository.Edit(newDoc);
                return Ok(_userRepository.GetById(int.Parse(dto.UserId)));
            }
        }
    }
}
