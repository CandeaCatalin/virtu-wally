using System;
using Microsoft.AspNetCore.Http;

namespace VirtuWally.Domain
{
    public class Doc
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime UploadedDate { get; set; }
        public Category Category { get; set; }
    }
}
