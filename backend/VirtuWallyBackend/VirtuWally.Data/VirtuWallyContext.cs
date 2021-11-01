using Microsoft.EntityFrameworkCore;
using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public class VirtuWallyContext : DbContext
    {
        public VirtuWallyContext(DbContextOptions<VirtuWallyContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Doc> Docs { get; set; }
        public DbSet<Category> Categories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doc>()
                .Property(d => d.UploadedDate)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<User>()
               .Property(u => u.CreatedTime)
               .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<User>(e => { e.HasIndex(e => e.Email).IsUnique(); });
        }
    }
}
