using System;
using Microsoft.AspNetCore.Http;

namespace VirtuWally.Domain
{
    public class Doc
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public int UserId { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public DateTime UploadedDate { get; set; }
        public byte[] FileData { get; set; }
    }
}
