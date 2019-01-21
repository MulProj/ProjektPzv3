using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models.Database
{
    public class DatabaseContext : IdentityDbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<House> Houses { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<SensorHistory> SensorHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TemperatureSensor>();
            builder.Entity<HumiditySensor>();
            builder.Entity<SmokeSensor>();
            builder.Entity<MotionSensor>();
            builder.Entity<SensorHistory>().Property(p => p.SensorHistoryId).ValueGeneratedOnAdd();

            base.OnModelCreating(builder);  
        }
    }
}
