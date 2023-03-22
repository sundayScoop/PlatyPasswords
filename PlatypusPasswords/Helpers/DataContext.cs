
using Microsoft.EntityFrameworkCore;

namespace PlatypusPasswords.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite(Configuration.GetConnectionString("LocalDbConnectionString"));
        }

        public DbSet<Entry> Entries { get; set; }

    }
}
