using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication3.Models.Database;
using WebApplication3.Models.Interfaces;

namespace WebApplication3.Models.Repositiories
{
    public class SensorRepository : ISensorRepository
    {
        private readonly DatabaseContext _databaseContext;
        public SensorRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int AddHumiditySensor(HumiditySensor sensor, House house)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            if (house == null)
            {
                throw new Exception("House object cannot be null");
            }

            //sensor.SensorId = 0;
            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = "Humidity";
            sensor.MinValue = 0.2;
            sensor.MaxValue = 0.4;

            _databaseContext.Sensors.Add(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public int AddMotionSensor(MotionSensor sensor, House house)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            if (house == null)
            {
                throw new Exception("House object cannot be null");
            }

            //sensor.SensorId = 0;
            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = "Motion";
            sensor.MinValue = null;
            sensor.MaxValue = null;

            _databaseContext.Sensors.Add(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public int AddSmokeSensor(SmokeSensor sensor, House house)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            if (house == null)
            {
                throw new Exception("House object cannot be null");
            }

            //sensor.SensorId = 0;
            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = "Smoke";
            sensor.MinValue = 0;
            sensor.MaxValue = 0.2;

            _databaseContext.Sensors.Add(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public int AddTemperatureSensor(TemperatureSensor sensor, House house)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            if (house == null)
            {
                throw new Exception("House object cannot be null");
            }

            //sensor.SensorId = 0;
            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = "Temperature";
            //sensor.MinValue = 18;
            //sensor.MaxValue = 25;

            _databaseContext.Sensors.Add(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public void DeleteSensor(Sensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            _databaseContext.Sensors.Remove(sensor);
            _databaseContext.SaveChanges();
        }

        public List<Sensor> GetAllOnSensors()
        {
            return _databaseContext.Sensors.Where(sensor => sensor.IsOn == true).ToList();
        }

        public List<Sensor> GetAllSensors()
        {
            return _databaseContext.Sensors.ToList();
        }

        public List<Sensor> GetHumiditySensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == "Humidity").ToList();
        }

        public List<Sensor> GetMotionSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == "Motion").ToList();
        }

        public Sensor GetSensor(int sensorId)
        {
            if (sensorId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.FirstOrDefault(sensor => sensor.SensorId == sensorId);
        }

        public List<Sensor> GetSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(id => id.HouseId == houseId).ToList();
        }

        public List<Sensor> GetSmokeSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == "Smoke").ToList();
        }

        public List<Sensor> GetTemperatureSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == "Temperature").ToList();
        }

        public int UpdateHumiditySensor(HumiditySensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            _databaseContext.Sensors.Update(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public int UpdateMotionSensor(MotionSensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            _databaseContext.Sensors.Update(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public int UpdateSmokeSensor(SmokeSensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            _databaseContext.Sensors.Update(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }

        public int UpdateTemperatureSensor(TemperatureSensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            _databaseContext.Sensors.Update(sensor);
            _databaseContext.SaveChanges();

            return sensor.SensorId;
        }
    }
}
