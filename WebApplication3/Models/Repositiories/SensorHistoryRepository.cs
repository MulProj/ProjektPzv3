using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication3.Models.Database;
using WebApplication3.Models.Interfaces;
using MoreLinq;
using WebApplication3.Models.Utils;

namespace WebApplication3.Models.Repositiories
{
    public class SensorHistoryRepository : ISensorHistoryRepository 
    {
        private readonly DatabaseContext _databaseContext;
        private SensorHistory sensorHistory;

        public SensorHistoryRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int AddHumiditySensorHistory(HumiditySensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            sensorHistory = new SensorHistory
            {
                HouseId = sensor.HouseId,
                SensorId = sensor.SensorId,
                Type = sensor.Type,
                Name = sensor.Name,
                Humidity = sensor.Humidity,
                IsOn = sensor.IsOn
            };

            _databaseContext.SensorHistories.Add(sensorHistory);
            _databaseContext.SaveChanges();

            return sensorHistory.SensorHistoryId;
        }

        public int AddMotionSensorHistory(MotionSensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            sensorHistory = new SensorHistory
            {
                HouseId = sensor.HouseId,
                SensorId = sensor.SensorId,
                Type = sensor.Type,
                Name = sensor.Name,
                IsMove = sensor.IsMove,
                IsOn = sensor.IsOn
            };

            _databaseContext.SensorHistories.Add(sensorHistory);
            _databaseContext.SaveChanges();
            
            return sensorHistory.SensorHistoryId;
        }

        public int AddSmokeSensorHistory(SmokeSensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            sensorHistory = new SensorHistory
            {
                HouseId = sensor.HouseId,
                SensorId = sensor.SensorId,
                Type = sensor.Type,
                Name = sensor.Name,
                Smoke = sensor.Smoke,
                IsOn = sensor.IsOn
            };

            _databaseContext.SensorHistories.Add(sensorHistory);
            _databaseContext.SaveChanges();

            return sensorHistory.SensorHistoryId;
        }

        public int AddTemperatureSensorHistory(TemperatureSensor sensor)
        {
            if (sensor == null)
            {
                throw new Exception("Sensore object cannot be null");
            }

            sensorHistory = new SensorHistory
            {
                HouseId = sensor.HouseId,
                SensorId = sensor.SensorId,
                Type = sensor.Type,
                Name = sensor.Name,
                Temperature = sensor.Temperature,
                IsOn = sensor.IsOn
            };

            _databaseContext.SensorHistories.Add(sensorHistory);
            _databaseContext.SaveChanges();

            return sensorHistory.SensorHistoryId;
        }

        public List<SensorHistory> GetAllSensorsHistory()
        {
            return _databaseContext.SensorHistories.ToList();
        }

        public SensorHistory GetSensorHistory(int sensorId)
        {
            if (sensorId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.SensorHistories.FirstOrDefault(sensor => sensor.SensorId == sensorId);
        }

        public List<SensorHistory> GetSensorsByHouseIdHistory(int houseId)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            return _databaseContext.SensorHistories.Where(id => id.HouseId == houseId).ToList();
        }

        public List<SensorHistory> GetTemperatureSensorsByHouseIdHistory(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            var sensorsTemperatureCount = _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.TEMPERATURE).Count();

            if (sensorsTemperatureCount - dataAmount < dataAmount)
            {
                return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.TEMPERATURE).ToList();
            }

            return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.TEMPERATURE).Skip(sensorsTemperatureCount - dataAmount).ToList();
        }

        public List<SensorHistory> GetHumiditySensorsByHouseIdHistory(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            var sensorsHumidityCount = _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.HUMIDITY).Count();

            if (sensorsHumidityCount - dataAmount < dataAmount)
            {
                return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.HUMIDITY).ToList();
            }

            return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.HUMIDITY).Skip(sensorsHumidityCount - dataAmount).ToList();
        }

        public List<SensorHistory> GetSmokeSensorsByHouseIdHistory(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            var sensorsSmokeCount = _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.SMOKE).Count();

            if (sensorsSmokeCount - dataAmount < dataAmount)
            {
                return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.SMOKE).ToList();
            }

            return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.SMOKE).Skip(sensorsSmokeCount - dataAmount).ToList();
        }

        public List<SensorHistory> GetMotionSensorsByHouseIdHistory(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                throw new Exception("Id cannot be less than 0");
            }

            var sensorsMotionCount = _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.MOTION).Count();

            if (sensorsMotionCount - dataAmount < dataAmount)
            {
                return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.MOTION).ToList();
            }

            return _databaseContext.SensorHistories.Where(s => s.HouseId == houseId && s.Type == ConstValues.MOTION).Skip(sensorsMotionCount - dataAmount).ToList();
        }
    }
}
