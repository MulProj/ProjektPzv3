using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApplication3.Models;
using WebApplication3.Models.Database;
using WebApplication3.Models.Repositiories;

namespace WebApplication3.Services
{
    public class MyHostedService : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger _logger;
        private Timer timer;
        private Random random = new Random();
        
        public MyHostedService(ILogger<MyHostedService> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed Background Service is starting.");

            timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed Background Service is stopping.");

            timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void DoWork(object state)
        {
            _logger.LogInformation("Timed Background Service is working.");

            using (var scope = _scopeFactory.CreateScope())
            {
                var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

                SensorHistoryRepository sensorHistoryRepository = new SensorHistoryRepository(databaseContext);
                SensorRepository sensorRepository = new SensorRepository(databaseContext);
                
                var temperatureSensors = databaseContext.Sensors.OfType<TemperatureSensor>().ToList();
                var humiditySensors = databaseContext.Sensors.OfType<HumiditySensor>().ToList();
                var smokeSensors = databaseContext.Sensors.OfType<SmokeSensor>().ToList();
                var motionSensors = databaseContext.Sensors.OfType<MotionSensor>().ToList();

                double currentTemperature = 0;
                double currentHumidity = 0;
                double currentSmoke = 0;
                double currentMotion = 0;
                const double MAX_NUMBER = 1.5;
                const double MIN_NUMBER = 0.5;

                foreach (var sensor in temperatureSensors)
                {
                    currentTemperature = random.NextDouble() * ((double)sensor.MaxValue * MAX_NUMBER - (double)sensor.MinValue * MIN_NUMBER) + (double)sensor.MinValue * MIN_NUMBER;
                    _logger.LogInformation("currentTemperature = " + currentTemperature);

                    if (currentTemperature > sensor.MaxValue || currentTemperature < sensor.MinValue)
                    {
                        sensor.IsOn = true;
                        sensor.Temperature = currentTemperature;
                    }

                    else
                    {
                        sensor.IsOn = false;
                        sensor.Temperature = currentTemperature;
                    }

                    _logger.LogInformation("IsOn = " + sensor.IsOn);

                    sensorHistoryRepository.AddTemperatureSensorHistory(sensor);
                    sensorRepository.UpdateTemperatureSensor(sensor);
                }

                foreach (var sensor in humiditySensors)
                {
                    currentHumidity = random.NextDouble() * ((double)sensor.MaxValue * MAX_NUMBER - (double)sensor.MinValue * MIN_NUMBER) + (double)sensor.MinValue * MIN_NUMBER;
                    _logger.LogInformation("currentHumidity = " + currentHumidity);

                    if (currentHumidity > sensor.MaxValue || currentHumidity < sensor.MinValue)
                    {
                        sensor.IsOn = true;
                        sensor.Humidity = currentHumidity;
                    }

                    else
                    {
                        sensor.IsOn = false;
                        sensor.Humidity = currentHumidity;
                    }

                    _logger.LogInformation("IsOn = " + sensor.IsOn);

                    sensorHistoryRepository.AddHumiditySensorHistory(sensor);
                    sensorRepository.UpdateHumiditySensor(sensor);
                }

                foreach (var sensor in smokeSensors)
                {
                    currentSmoke = random.NextDouble() * ((double)sensor.MaxValue * MAX_NUMBER - (double)sensor.MinValue * MIN_NUMBER) + (double)sensor.MinValue * MIN_NUMBER;
                    _logger.LogInformation("currentSmoke = " + currentSmoke);

                    if (currentSmoke > sensor.MaxValue || currentSmoke < sensor.MinValue)
                    {
                        sensor.IsOn = true;
                        sensor.Smoke = currentSmoke;
                    }

                    else
                    {
                        sensor.IsOn = false;
                        sensor.Smoke = currentSmoke;
                    }

                    _logger.LogInformation("IsOn = " + sensor.IsOn);

                    sensorHistoryRepository.AddSmokeSensorHistory(sensor);
                    sensorRepository.UpdateSmokeSensor(sensor);
                }

                foreach (var sensor in motionSensors)
                {
                    currentMotion = random.NextDouble();
                    _logger.LogInformation("currentMotion = " + currentMotion);

                    if (currentMotion > 0.5)
                    {
                        sensor.IsOn = true;
                        sensor.IsMove = true;
                    }

                    else
                    {
                        sensor.IsOn = false;
                        sensor.IsMove = false;
                    }

                    _logger.LogInformation("IsOn = " + sensor.IsOn);

                    sensorHistoryRepository.AddMotionSensorHistory(sensor);
                    sensorRepository.UpdateMotionSensor(sensor);
                }
            }
        }

        public void Dispose()
        {
            timer?.Dispose();
        }
    }
}
