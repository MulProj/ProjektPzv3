using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models;
using WebApplication3.Models.Interfaces;

namespace WebApplication3.Controllers
{
    [Produces("application/json")]
    [Route("api/Houses")]
    [ApiController]
    public class HousesController : ControllerBase
    {
        private readonly IHouseRepository _houseRepository;

        public HousesController(IHouseRepository houseRepository)
        {
            _houseRepository = houseRepository;
        }

        [HttpPost("[action]")]
        public IActionResult AddHouse([FromBody] House house)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            house.HouseId = 0;

            _houseRepository.AddHouse(house);

            return new JsonResult(house.HouseId);
        }

        [HttpGet("[action]")]
        public IActionResult DeleteHouse(int houseId)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            var house = _houseRepository.GetHouse(houseId);

            if (house == null)
            {
                return NotFound("Cannot find sensor with provided sensorId.");
            }

            _houseRepository.DeleteHouse(house);

            return new JsonResult(houseId);
        }

        [HttpGet("[action]")]
        public IActionResult GetHouses()
        {
            return new JsonResult(_houseRepository.GetAllHouses());
        }

        [HttpGet("[action]")]
        public IActionResult GetHouse(int houseId)
        {
            if (houseId <= 0)
            {
                return BadRequest();
            }

            return new JsonResult(_houseRepository.GetHouse(houseId));
        }

        [HttpPost("[action]")]
        public IActionResult UpdateHouse([FromBody] House house)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _houseRepository.UpdateHouse(house);

            return new JsonResult(house.HouseId);
        }
    }
}