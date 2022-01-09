namespace VirtuWally.API.Dtos
{
    public class UpdateDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NewPassword { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
