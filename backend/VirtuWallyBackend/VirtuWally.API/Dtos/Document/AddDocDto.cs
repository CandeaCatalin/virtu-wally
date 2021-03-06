using Microsoft.AspNetCore.Http;

namespace VirtuWally.API.Dtos.Document
{
    public class AddDocumentDto
    {
        public IFormFile File { get; set; }
        public string CategoryId { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
    }
}
