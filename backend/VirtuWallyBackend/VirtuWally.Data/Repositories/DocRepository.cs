using System;
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
        public void Add(Doc doc)
        {
            _context.Docs.Add(doc);
            _context.SaveChanges();
        }

        public Doc GetById(int docId)
        {
            return _context.Docs.FirstOrDefault(d => d.Id == docId);
        }

        public void Edit(Doc newDoc)
        {
            Doc editedDoc = GetById(newDoc.Id);
            if (newDoc.Name != "")
            {
                editedDoc.Name = newDoc.Name;
            }

            if (newDoc.CategoryId != 0)
            {
                editedDoc.CategoryId = newDoc.CategoryId;
            }

            if (newDoc.FileData != Array.Empty<byte>())
            {
                editedDoc.FileData = newDoc.FileData;
            }

            _context.Docs.Update(editedDoc);
            _context.SaveChanges();

        }
        public void Remove(int docId)
        {
            Doc removedDoc = GetById(docId);
            _context.Docs.Remove(removedDoc);
            _context.SaveChanges();
        }
    }
}
