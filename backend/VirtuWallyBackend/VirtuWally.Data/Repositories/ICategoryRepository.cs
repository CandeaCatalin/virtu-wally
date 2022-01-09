using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public interface ICategoryRepository
    {
        public void Remove( int categoryId);
        public void Add(Category category);
        public Category GetById(int categoryId);
    }
}
