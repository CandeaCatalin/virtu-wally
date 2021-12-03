using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public interface IDocRepository
    {
        public void Remove( int docId);
        public void Add(Doc doc);
        public Doc GetById(int docId);
    }
}
