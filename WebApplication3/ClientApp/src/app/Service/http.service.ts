import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { House, Sensor, TemperatureSensor, SmokeSensor, HumiditySensor, MotionSensor } from '../app.component';

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) { }
  getHousebyId(houseId: number): Observable<House>{
    return this.http.get<House>('https://localhost:5001/api/houses/gethouse?houseid='+houseId);
  }
  getHouses(): Observable<Array<House>>{
    return this.http.get<Array<House>>('https://localhost:5001/api/houses/gethouses');
  }
  getSensors() :Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensors/getsensors')
  }
  getOnSensors() :Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensors/getonsensors')
  }
  getSensorsByHouseId(houseId: number):Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensors/getsensorsbyhouseid?houseid='+houseId)
  }

  getTemperatureSensorsByHouseId(houseId: number): Observable<Array<TemperatureSensor>>{
    return this.http.get<Array<TemperatureSensor>>('https://localhost:5001/api/sensors/gettemperaturesensorsbyhouseid?houseid='+houseId)
  }
  getHumiditySensorsByHouseId(houseId: number): Observable<Array<HumiditySensor>>{
    return this.http.get<Array<HumiditySensor>>('https://localhost:5001/api/sensors/gethumiditysensorsbyhouseid?houseid='+houseId)
  }
  getSmokeSensorsByHouseId(houseId: number): Observable<Array<SmokeSensor>>{
    return this.http.get<Array<SmokeSensor>>('https://localhost:5001/api/sensors/getsmokesensorsbyhouseid?houseid='+houseId)
  }
  getMotionSensorsByHouseId(houseId: number): Observable<Array<MotionSensor>>{
    return this.http.get<Array<MotionSensor>>('https://localhost:5001/api/sensors/getmotionsensorsbyhouseid?houseid='+houseId)
  }
  delSensor(sensorId: number):Observable<Sensor>{
    return this.http.get('https://localhost:5001/api/sensors/deletesensor?sensorid='+ sensorId)
  }

  /*HISTORIA*/
  getTemperatureHistoryByHouseId(houseId: number, dataAmount: number):Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensorhistories/gettemperaturesensorsbyhouseid?houseid='+houseId+ '&dataAmount='+dataAmount)
  }
  getHumidityHistoryByHouseId(houseId: number, dataAmount: number):Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensorhistories/gethumiditysensorsbyhouseid?houseid='+houseId+ '&dataAmount='+dataAmount)
  }
  getSmokeHistoryByHouseId(houseId: number, dataAmount: number):Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensorhistories/getsmokesensorsbyhouseid?houseid='+houseId+ '&dataAmount='+dataAmount)
  }
  getMotionHistoryByHouseId(houseId: number, dataAmount: number):Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensorhistories/getmotionsensorsbyhouseid?houseid='+houseId+ '&dataAmount='+dataAmount)
  }
  updateTemperatureSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateTemperatureSensor', sensor)
  }
  updateHumiditySensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateHumiditySensor', sensor)
  }
  updateSmokeSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateSmokeSensor', sensor)
  }
  updateMotionSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateMotionSensor', sensor)
  }
  addHouse(house: House):Observable<House>{
    return this.http.post('https://localhost:5001/api/Houses/addhouse', house)
  }
  delHouse(houseId: number):Observable<House>{
    return this.http.get('https://localhost:5001/api/Houses/deletehouse?houseid='+ houseId)
  }
  addTemperatureSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddTemperatureSensor', sensor) 
  }
  addMotionSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddMotionSensor', sensor)
  }
  addHumiditySensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddHumiditySensor', sensor)
  }
  addSmokeSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddSmokeSensor', sensor)
  }
  
}
