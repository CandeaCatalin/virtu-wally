using System;
using System.Linq;
using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly VirtuWallyContext _context;
        public UserRepository(VirtuWallyContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            if (user.FirstName == null || user.FirstName == "")
            {
                throw new FormatException("FirstName is invalid");
            }
            if (user.LastName == null || user.LastName == "")
            {
                throw new FormatException("LastName is invalid");
            }
            if (user.HashPassword == null || user.HashPassword == "")
            {
                throw new FormatException("Password is invalid");
            }
            if (user.Email == null || user.Email == "" || new System.Net.Mail.MailAddress(user.Email) == null)
            {
                throw new FormatException("Email is invalid");
            }



            _context.Users.Add(user);
            user.Id = _context.SaveChanges();
            return user;
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email.ToLower());
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }
    }
}
