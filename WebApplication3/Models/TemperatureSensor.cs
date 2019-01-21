using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    [NotMapped]
    public class TemperatureSensor : Sensor
    {
        public double Temperature { get; set; }
    }
}
