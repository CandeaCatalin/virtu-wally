using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using VirtuWally.Domain;

namespace VirtuWally.Data
{
    public class VirtuWallyContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Doc> Docs { get; set; }
        public DbSet<Category> Categories { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-NMANGOQ\\SQLEXPRESS;Initial Catalog=VirtuWally; Integrated Security=true;").LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information)
            .EnableSensitiveDataLogging();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doc>()
                .Property(d => d.UploadedDate)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<User>()
               .Property(u => u.CreatedTime)
               .HasDefaultValueSql("getdate()");
        }
    }
}
