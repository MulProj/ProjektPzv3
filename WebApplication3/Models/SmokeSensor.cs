using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    [NotMapped]
    public class SmokeSensor : Sensor
    {
        public double Smoke { get; set; }
    }
}
