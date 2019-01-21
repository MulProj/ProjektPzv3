using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    [NotMapped]
    public class MotionSensor : Sensor
    {
        public bool IsMove { get; set; }
    }
}
