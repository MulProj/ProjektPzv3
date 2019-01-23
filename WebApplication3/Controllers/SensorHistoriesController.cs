using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models.Interfaces;

namespace WebApplication3.Controllers
{
    [Produces("application/json")]
    [Route("api/SensorHistories")]
    [ApiController]
    public class SensorHistoriesController : ControllerBase
    {
        private readonly ISensorHistoryRepository _sensorHistoryRepository;

        public SensorHistoriesController(ISensorHistoryRepository sensorHistoryRepository)
        {
            _sensorHistoryRepository = sensorHistoryRepository;
        }

        [HttpGet("[action]")]
        public IActionResult GetSensors()
        {
            return new JsonResult(_sensorHistoryRepository.GetAllSensorsHistory());
        }

        [HttpGet("[action]")]
        public IActionResult GetSensor(int sensorId)
        {
            if (sensorId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_sensorHistoryRepository.GetSensorHistory(sensorId));
        }

        [HttpGet("[action]")]
        public IActionResult GetSensorsByHouseId(int houseId)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_sensorHistoryRepository.GetSensorsByHouseIdHistory(houseId));
        }

        [HttpGet("[action]")]
        public IActionResult GetTemperatureSensorsByHouseId(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_sensorHistoryRepository.GetTemperatureSensorsByHouseIdHistory(houseId, dataAmount));
        }

        [HttpGet("[action]")]
        public IActionResult GetHumiditySensorsByHouseId(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_sensorHistoryRepository.GetHumiditySensorsByHouseIdHistory(houseId, dataAmount));
        }

        [HttpGet("[action]")]
        public IActionResult GetSmokeSensorsByHouseId(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_sensorHistoryRepository.GetSmokeSensorsByHouseIdHistory(houseId, dataAmount));
        }

        [HttpGet("[action]")]
        public IActionResult GetMotionSensorsByHouseId(int houseId, int dataAmount)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_sensorHistoryRepository.GetMotionSensorsByHouseIdHistory(houseId, dataAmount));
        }
    }
}