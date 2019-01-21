namespace WebApplication3.Models
{
    public class SensorHistory
    {
        public int SensorHistoryId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public double? Temperature { get; set; }
        public double? Humidity { get; set; }
        public double? Smoke { get; set; }
        public bool? IsMove { get; set; }
        public bool IsOn { get; set; }
        public int HouseId { get; set; }
        //public virtual House House { get; set; }
        public int SensorId { get; set; }
        //public virtual Sensor Sensor { get; set; }
        
    }
}
