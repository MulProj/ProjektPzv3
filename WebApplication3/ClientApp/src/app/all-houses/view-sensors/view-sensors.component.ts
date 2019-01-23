import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/Service/http.service';
import {Chart} from 'chart.js';
import { Sensor, MotionSensor, SmokeSensor, HumiditySensor, TemperatureSensor } from 'src/app/app.component';

@Component({
  selector: 'app-view-sensors',
  templateUrl: './view-sensors.component.html',
  styleUrls: ['./view-sensors.component.css']
})


export class ViewSensorsComponent implements OnInit {
  sensors$
  motionSensorNumber: number
  temperatureSensorNumber: number
  humiditySensorNumber: number
  smokeSensorNumber: number

  motionSensors: MotionSensor[] = new Array<MotionSensor>();
  smokeSensors: SmokeSensor[] = new Array<SmokeSensor>();
  humiditySensors: HumiditySensor[] = new Array<HumiditySensor>();
  temperatureSensors: TemperatureSensor[] = new Array<TemperatureSensor>();

  constructor(private httpService: HttpService) { }


  @Input()
  houseId

  timeLeft: number = 60;
  interval;

  temperatureCounter: number;
  humidityConuter: number;
  motionCounter: number;
  smokeCounter: number;

  ngOnInit() {

    this.sensors$ = this.httpService.getSensorsByHouseId(this.houseId);

    this.sensors$.subscribe(sensors => {
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].type == "Temperature") {
          const temperatureSensor: TemperatureSensor = ({
            sensorId: sensors[i].sensorId,
            name: sensors[i].name,
            minValue: sensors[i].value,
            temperature: sensors[i].temperature,
            maxValue: sensors[i].maxValue,
            isOn: sensors[i].isOn,
          })
          this.temperatureSensors.push(temperatureSensor);


        } else if (sensors[i].type == "Humidity") {
          const humiditySensor: HumiditySensor = ({
            sensorId: sensors[i].sensorId,
            name: sensors[i].name,
            minValue: sensors[i].minvalue,
            humidity: sensors[i].humidity,
            maxValue: sensors[i].maxValue,
            isOn: sensors[i].isOn,
          })
            this.humiditySensors.push(humiditySensor);

        } else if (sensors[i].type == "Smoke") {
          const smokeSensor: HumiditySensor = ({
            sensorId: sensors[i].sensorId,
            name: sensors[i].name,
            minValue: sensors[i].minvalue,
            humidity: sensors[i].humidity,
            maxValue: sensors[i].maxValue,
            isOn: sensors[i].isOn,
          })
            this.smokeSensors.push(smokeSensor);


        } else if (sensors[i].type == "Motion") {

          const motionSensor: MotionSensor = ({
            sensorId: sensors[i].sensorId,
            name: sensors[i].name,
            isMove: sensors[i].isMove,
            isOn: sensors[i].isOn,
          })
          this.motionSensors.push(motionSensor)
        }
      }
      
    })

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.sensors$ = this.httpService.getSensorsByHouseId(this.houseId);

        this.sensors$.subscribe(sensors => {
          this.sensorsNumbers(sensors);
          this.humidityConuter = 0;
          this.smokeCounter = 0;
          this.temperatureCounter = 0;
          this.motionCounter = 0;
          for (var i = 0; i < sensors.length; i++) {

            if (sensors[i].type == "Temperature") {

                while(this.temperatureSensors.length>this.temperatureSensorNumber)
                  this.temperatureSensors.pop(); 
                while(this.temperatureSensors.length<this.temperatureSensorNumber)
                {
                  const temperatureSensor: TemperatureSensor = ({
                    sensorId: null,
                    name: null,
                    minValue: null,
                    temperature: null,
                    maxValue: null,
                    isOn:null,
                  })
                  this.temperatureSensors.push(temperatureSensor);
                }
              this.temperatureSensors[this.temperatureCounter].sensorId = sensors[i].sensorId;
              this.temperatureSensors[this.temperatureCounter].minValue = sensors[i].minValue;
              this.temperatureSensors[this.temperatureCounter].maxValue = sensors[i].maxValue;
              this.temperatureSensors[this.temperatureCounter].name = sensors[i].name;
              this.temperatureSensors[this.temperatureCounter].temperature = sensors[i].temperature;
              this.temperatureSensors[this.temperatureCounter].isOn = sensors[i].isOn;
              this.temperatureCounter++;
            }
            else if (sensors[i].type == "Humidity") {

                while(this.humiditySensors.length>this.humiditySensorNumber)
                  this.humiditySensors.pop(); 
                while(this.humiditySensors.length<this.humiditySensorNumber)
                {
                  const humiditySensor: HumiditySensor = ({
                    sensorId: null,
                    name: null,
                    minValue: null,
                    humidity: null,
                    maxValue: null,
                    isOn:null,
                  })
                  this.temperatureSensors.push(humiditySensor);
                }
              this.humiditySensors[this.humidityConuter].sensorId = sensors[i].sensorId;
              this.humiditySensors[this.humidityConuter].minValue = sensors[i].minValue;
              this.humiditySensors[this.humidityConuter].maxValue = sensors[i].maxValue;
              this.humiditySensors[this.humidityConuter].name = sensors[i].name;
              this.humiditySensors[this.humidityConuter].humidity = sensors[i].humidity;
              this.humiditySensors[this.humidityConuter].isOn = sensors[i].isOn;
              this.humidityConuter++;
            }
            else if (sensors[i].type == "Smoke") {
              
                while(this.smokeSensors.length>this.smokeSensorNumber)
                  this.smokeSensors.pop(); 
                while(this.smokeSensors.length<this.smokeSensorNumber)
                {
                  const smokeSensor: SmokeSensor = ({
                    sensorId: null,
                    name: null,
                    minValue: null,
                    smoke: null,
                    maxValue: null,
                    isOn:null,
                  })
                  this.smokeSensors.push(smokeSensor);
                }
              this.smokeSensors[this.smokeCounter].sensorId = sensors[i].sensorId;
              this.smokeSensors[this.smokeCounter].minValue = sensors[i].minValue;
              this.smokeSensors[this.smokeCounter].maxValue = sensors[i].maxValue;
              this.smokeSensors[this.smokeCounter].name = sensors[i].name;
              this.smokeSensors[this.smokeCounter].smoke = sensors[i].smoke;
              this.smokeSensors[this.smokeCounter].isOn = sensors[i].isOn;
              this.smokeCounter++;
            }
            else if (sensors[i].type == "Motion") {
              while(this.motionSensors.length>this.motionSensorNumber)
              this.motionSensors.pop(); 
            while(this.motionSensors.length<this.motionSensorNumber)
            {
              const motionSensor: MotionSensor = ({
                sensorId: null,
                name: null,
                isMove: null,
                isOn: null,
              })
              this.motionSensors.push(motionSensor);
            }
            this.motionSensors[this.motionCounter].sensorId= sensors[i].sensorId;
            this.motionSensors[this.motionCounter].name= sensors[i].name;
            this.motionSensors[this.motionCounter].isMove= sensors[i].isMove;
            this.motionSensors[this.motionCounter].isOn= sensors[i].isOn;
            }
          }
        })
      }
      else {
        this.timeLeft = 60;
      }
    }, 3000)

    
 

  }
 

  sensorsNumbers(temp: Sensor[]) {
    this.temperatureSensorNumber=0;
    this.humiditySensorNumber=0;
    this.smokeSensorNumber=0;
    this.motionSensorNumber=0;
    for( var k of temp)
    {
      switch(k.type){
        case "Temperature" : {
          this.temperatureSensorNumber++;
          break;
        }
        case "Humidity" : {
          this.humiditySensorNumber++;
          break;
        }
        case "Smoke" : {
          this.smokeSensorNumber++;
          break;
        }
        case "Motion" : {
          this.motionSensorNumber++;
          break;
        }
          
      }
    }

  }

  editSensor(id: number)
  {
    console.log(id);
  }

  delSensor( id: number)
  {
    this.httpService.delSensor(id).subscribe(
      success=>{
        this.ngOnInit();
      },
      error =>{}
    );
  }


}
    


