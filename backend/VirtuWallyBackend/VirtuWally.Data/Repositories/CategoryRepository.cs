using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly VirtuWallyContext _context;
        public CategoryRepository(VirtuWallyContext context)
        {
            _context = context;
        }
        public void Remove( int categoryId)
        {
            Category category = _context.Categories.Find(categoryId);
            _context.Categories.Remove(category);
            _context.SaveChanges();
        }

        public void Add(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }
    }
}
