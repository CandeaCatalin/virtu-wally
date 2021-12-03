using System.Linq;
using VirtuWally.Domain;

namespace VirtuWally.Data.Repositories
{
    public class DocRepository : IDocRepository
    {
        private readonly VirtuWallyContext _context;
        public DocRepository(VirtuWallyContext context)
        {
            _context = context;
        }
        public void Remove( int docId)
        {
            Doc doc = _context.Docs.Find(docId);
            _context.Docs.Remove(doc);
            _context.SaveChanges();
        }

        public void Add(Doc doc)
        {
            _context.Docs.Add(doc);
            _context.SaveChanges();
        }

        public Doc GetById(int docId)
        {
            return _context.Docs.FirstOrDefault(d => d.Id == docId);
        }
    }
}
