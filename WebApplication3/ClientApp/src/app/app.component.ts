import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Service/http.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private httpService: HttpService){}
  /*Observable, który otrzyma dane z serwera */
  allSensors$

  /*Tablica, która będzie przechowywała aktualne dane */
  sensors: Sensor[]= new Array();

  /*Zmienne do obsługi czasowej aktualizacji danych */
  timeLeft: number = 60;
  interval;

  temperatureSensorNumber: number;
  motionSensorNumber: number;
  smokeSensorNumber: number;
  humiditySensorNumber: number;
  houseDesc: string;
  temperatureAlert : SensorAlert[] = new Array<SensorAlert>();
  humidityAlert : SensorAlert[] = new Array<SensorAlert>();
  smokeAlert : SensorAlert[] = new Array<SensorAlert>();
  motionAlert : SensorAlert[] = new Array<SensorAlert>();
  sensorsAlert: Sensor[] = new Array<Sensor>();

  actualTemperatureSensors: number;
  futureTemperatureSensors: number;

  temperatureCounter: number;
  humidityConuter: number;
  motionCounter: number;
  smokeCounter: number;
 
  ngOnInit(): void {



   this.interval = setInterval(() => {
      if (this.timeLeft > 0) {

      this.allSensors$ = this.httpService.getOnSensors().subscribe(sen =>{
        while(sen.length>this.sensorsAlert.length)
          {
            const s : Sensor =({            
              name: null,
            })
              this.sensorsAlert.push(s);
          }
          while(sen.length<this.sensorsAlert.length)
          {
            this.sensorsAlert.pop();
          }
          for(var i=0; i<this.sensorsAlert.length; i++)
          {
            this.sensorsAlert[i].name = sen[i].name;
          }


      })
console.log(this.sensorsAlert);
}   
      
else {
  this.timeLeft = 60;
}
}, 4000)

}
  
  title = 'SmartHome';

 
  sensorsNumbers(temp: Sensor[]) {
    this.temperatureSensorNumber=0;
    this.humiditySensorNumber=0;
    this.smokeSensorNumber=0;
    this.motionSensorNumber=0;
    for( var k of temp)
    {
      switch(k.type){
        case "Temperature" : {
          if(k.isOn)
            this.temperatureSensorNumber++;
          break;
        }
        case "Humidity" : {
          if(k.isOn)
            this.humiditySensorNumber++;
          break;
        }
        case "Smoke" : {
          if(k.isOn)
            this.smokeSensorNumber++;
          break;
        }
        case "Motion" : {
          if(k.isOn)
            this.motionSensorNumber++;
          break;
        }
          
      }
    }

  }

}
export class SensorAlert{
  sensorName: string;
  minValue: number;
  maxValue: number;
  actualValue: number;
  isOn: boolean
}

export class House{
  houseId?: number;
  street?: string;
  houseNumber?: string;
  postCode?: string;
  town?: string;
  description?: string;
  sensors?: Sensor[];
  image?: String  
}
export class Sensor{ 

  sensorId?: number;
  type?: string;
  maxValue?: number;
  minValue?: number;
  isOn?: boolean;
  coordinateX?: number;
  coordinateY?: number;
  name?: string;
  houseId?: number;
  house?: House[];
}

export class HumiditySensor extends Sensor{
  humidity?: number;

}

export class TemperatureSensor extends Sensor{
  temperature?: number;
  
}

export class SmokeSensor extends Sensor{
  smoke?: number;
  
}

export class MotionSensor extends Sensor{
  isMove?: boolean;
  
}