namespace WebApplication3.Models
{
    public abstract class Sensor
    {
        public int SensorId { get; set; }
        public string Type { get; set; }
        public double? MaxValue { get; set; }
        public double? MinValue { get; set; }
        public bool IsOn { get; set; }
        public double CoordinateX { get; set; }
        public double CoordinateY { get; set; }
        public string Name { get; set; }
        public virtual int HouseId { get; set; }
        public virtual House House { get; set; }
    }
}
