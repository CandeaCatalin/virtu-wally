using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);
        void UpdateImage(int userId,byte[] image);
        User UpdateSettings(User user, string newPassword);
        void VerifyRegistration(int userId);
    }
}
