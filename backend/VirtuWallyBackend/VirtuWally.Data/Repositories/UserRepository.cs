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
            _context.SaveChanges();
            
            return GetByEmail(user.Email);
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email.ToLower());
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }
        bool IsValidEmail(string email)
        {
            if (email.Trim().EndsWith("."))
            {
                return false; // suggested by @TK-421
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }

}
