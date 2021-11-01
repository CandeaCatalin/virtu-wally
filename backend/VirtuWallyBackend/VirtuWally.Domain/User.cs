using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VirtuWally.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [JsonIgnore]
        public string HashPassword { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public List<Doc> Docs { get; set; } = new List<Doc>();
        public DateTime CreatedTime { get; set; }
    }
}
