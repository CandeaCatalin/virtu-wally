using System.Collections.Generic;
using System.Linq;
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
            var docs = _context.Docs.Where(d => d.CategoryId != categoryId);
            foreach (var doc in docs)
            {
                _context.Docs.Remove(doc);
            }
            _context.SaveChanges();
            _context.Categories.Remove(category);
            _context.SaveChanges();
        }

        public void Add(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        public Category GetById(int categoryId)
        {
            return _context.Categories.FirstOrDefault(c => c.Id == categoryId);
        }
    }
}
