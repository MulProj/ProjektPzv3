using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication3.Models.Database;
using WebApplication3.Models.Interfaces;
using WebApplication3.Models.Utils;

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

            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = ConstValues.HUMIDITY;
            
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
            
            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = ConstValues.MOTION;
            
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
            
            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = ConstValues.SMOKE;
            
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

            sensor.House = house;
            sensor.HouseId = house.HouseId;
            sensor.Type = ConstValues.TEMPERATURE;
            
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

        public List<Sensor> GetHumiditySensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == ConstValues.HUMIDITY).ToList();
        }

        public List<Sensor> GetMotionSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == ConstValues.MOTION).ToList();
        }

        public List<Sensor> GetSmokeSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == ConstValues.SMOKE).ToList();
        }

        public List<Sensor> GetTemperatureSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.Sensors.Where(s => s.HouseId == houseId && s.Type == ConstValues.TEMPERATURE).ToList();
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
