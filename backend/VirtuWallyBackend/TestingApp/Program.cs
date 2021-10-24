using System;
using System.Linq;
using VirtuWally.Data;
using VirtuWally.Domain;

namespace TestingApp
{
    internal class Program
    {
        private static readonly VirtuWallyContext _context = new VirtuWallyContext();

        private static void Main(string[] args)
        {
            _context.Database.EnsureCreated();
            AddUser();
            GetUsers("Users in db:");
            Console.Write("Press any key...");
            Console.ReadKey();
        }
        private static void AddUser()
        {
            _context.Users.Add(new User { Id = new Guid(), FirstName = "Marian", LastName = "John", ImageUrl = "", HashPassword = "hashedpassword", Email = "testing@gmail.com" });
            _context.SaveChanges();
        }
        private static void GetUsers(string text)
        {
            System.Collections.Generic.List<User> users = _context.Users.ToList();
            Console.WriteLine($"{text}: Users count is {users.Count}");
            foreach (User user in users)
            {
                Console.WriteLine(user.FirstName + " " + user.HashPassword);
            }
        }
    }
}
