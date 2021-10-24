using System;
using System.Collections.Generic;

namespace VirtuWally.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string HashPassword { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public List<Doc> Docs { get; set; } = new List<Doc>();
        public DateTime CreatedTime { get; set; }
    }
}
