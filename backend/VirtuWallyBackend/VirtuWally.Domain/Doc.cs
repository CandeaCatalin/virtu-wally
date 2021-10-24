using System;

namespace VirtuWally.Domain
{
    public class Doc
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public DateTime UploadedDate { get; set; }
        public Category Category { get; set; }
    }
}
