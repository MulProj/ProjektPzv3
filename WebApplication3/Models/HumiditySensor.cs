using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    [NotMapped]
    public class HumiditySensor : Sensor
    {
        public double Humidity { get; set; }
    }
}
