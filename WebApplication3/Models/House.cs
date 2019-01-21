using System.Collections.Generic;

namespace WebApplication3.Models
{
    public class House
    {
        public int HouseId { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostCode { get; set; }
        public string Town { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public ICollection<Sensor> Sensors { get; set; }
    }
}
