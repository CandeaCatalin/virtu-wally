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
