using System.Collections.Generic;

namespace WebApplication3.Models.Interfaces
{
    public interface ISensorHistoryRepository
    {
        List<SensorHistory> GetAllSensorsHistory();
        SensorHistory GetSensorHistory(int sensorId);
        List<SensorHistory> GetSensorsByHouseIdHistory(int houseId);
        List<SensorHistory> GetTemperatureSensorsByHouseIdHistory(int houseId, int dataAmount);
        List<SensorHistory> GetHumiditySensorsByHouseIdHistory(int houseId, int dataAmount);
        List<SensorHistory> GetSmokeSensorsByHouseIdHistory(int houseId, int dataAmount);
        List<SensorHistory> GetMotionSensorsByHouseIdHistory(int houseId, int dataAmount);
        int AddHumiditySensorHistory(HumiditySensor sensor);
        int AddMotionSensorHistory(MotionSensor sensor);
        int AddSmokeSensorHistory(SmokeSensor sensor);
        int AddTemperatureSensorHistory(TemperatureSensor sensor);
    }
}
