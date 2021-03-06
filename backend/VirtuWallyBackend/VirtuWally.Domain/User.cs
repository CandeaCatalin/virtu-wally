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
        public byte[] ImageUrl { get; set; } = new byte[] { };
        public List<Doc> Docs { get; set; } = new List<Doc>();
        public List<Category> Categories { get; set; } = new List<Category>();
        public DateTime CreatedTime { get; set; }
        public bool IsActivated { get; set; } = false;
    }
}
