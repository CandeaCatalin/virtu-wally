using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            if (string.IsNullOrEmpty(user.FirstName))
            {
                throw new FormatException("FirstName is invalid");
            }

            if (string.IsNullOrEmpty(user.LastName))
            {
                throw new FormatException("LastName is invalid");
            }

            if (string.IsNullOrEmpty(user.HashPassword))
            {
                throw new FormatException("Password is invalid");
            }

            if (string.IsNullOrEmpty(user.Email) || new System.Net.Mail.MailAddress(user.Email) == null)
            {
                throw new FormatException("Email is invalid");
            }

            Category car = new Category();
            car.Name = "Car";
            Category medical = new Category();
            medical.Name = "Medical";
            Category personal = new Category();
            personal.Name = "Personal";
            user.Categories.Add(car);
            user.Categories.Add(medical);
            user.Categories.Add(personal);
            _context.Users.Add(user);
            _context.SaveChanges();

            return GetByEmail(user.Email);
        }

        public User GetByEmail(string email)
        {
            return _context.Users.Include(u => u.Docs).Include(u => u.Categories)
                .FirstOrDefault(u => u.Email == email.ToLower());
        }

        public User GetById(int id)
        {
            return _context.Users.Include(u => u.Docs).Include(u => u.Categories)
                .FirstOrDefault(u => u.Id == id);
            ;
        }

        public User UpdateImage(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
            return user;
        }

        public User UpdateSettings(User user, string newPassword)
        {
            User updatedUser = GetById(user.Id);

            if (!string.IsNullOrEmpty(user.LastName))
            {
                updatedUser.LastName = user.LastName;
            }

            if (!string.IsNullOrEmpty(user.FirstName))
            {
                updatedUser.FirstName = user.FirstName;
            }



            if (!string.IsNullOrEmpty(user.Email))
            {
                if (new System.Net.Mail.MailAddress(user.Email) == null)
                {
                    throw new FormatException("Email is invalid");
                }
                updatedUser.Email = user.Email;
            }

            if (!string.IsNullOrEmpty(user.HashPassword))
            {
                updatedUser.HashPassword = user.HashPassword;
            }

            _context.Users.Update(updatedUser);
            _context.SaveChanges();
            return updatedUser;
        }
        public void VerifyRegistration(int userId)
        {
            User user = GetById(userId);
            user.IsActivated = true;
            _context.Users.Update(user);
            _context.SaveChanges();
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
