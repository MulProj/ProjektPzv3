import { Component, Input, ViewChild} from '@angular/core';
import { HumiditySensor, TemperatureSensor, SmokeSensor, MotionSensor } from 'src/app/app.component';
import { HttpService } from '../../Service/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-sensors',
  templateUrl: './add-sensors.component.html',
  styleUrls: ['./add-sensors.component.css']
})
export class AddSensorsComponent{
  model: any ={}

  onSubmit(){
    alert('success');
  }
  constructor(private httpService: HttpService) { }
  /*Zmienne, które przekazał komponent-rodzic */ 
  @Input()
  houseId: number;
  @Input()
  plan: string;

  stan: number = 0;

  numberTemperatureSensor: number
  newHumiditySensor : HumiditySensor = new HumiditySensor();
  newTemperatureSensor : TemperatureSensor = new TemperatureSensor();
  newSmokeSensor : SmokeSensor = new SmokeSensor();
  newMotionSensor : MotionSensor = new MotionSensor();
  
  /*Zmienne przekazywane komponentom-dzieciom */
  newSensor: boolean=false;

  @ViewChild('tempForm') tempForm;
  @ViewChild('smokeForm') smokeForm;
  @ViewChild('humidityForm') humidityForm;
  @ViewChild('motionForm') motionForm;

  addTempSensor(ts: TemperatureSensor)
  {
    ts.coordinateX=10;
    ts.coordinateY=10;
    ts.houseId=this.houseId;
    this.httpService.addTemperatureSensor(ts).subscribe(
      success=>{
        this.newSensor=true;
        this.stan=1;
      },
      error=>{ this.stan=2;})  
      this.tempForm.resetForm();     
  }

  addMotionSensor(ms : MotionSensor)
  {
    ms.coordinateX=10;
    ms.coordinateY=10;
    ms.houseId=this.houseId;
    this.httpService.addMotionSensor(ms).subscribe(
      success=>{this.newSensor=true;},
      error=>{})   
      this.motionForm.resetForm();
  }

  addSmokeSensor(ss: SmokeSensor)
  {
    ss.coordinateX= 10;
    ss.coordinateY=10;
    ss.houseId=this.houseId;
    this.httpService.addSmokeSensor(ss).subscribe(
      success=>{console.log(this.newSensor=true)},
      error=>{}) 
      this.smokeForm.resetForm();
  }
  addHumiditySensor(hs: HumiditySensor)
  {
    hs.coordinateX=10;
    hs.coordinateY=10;
    hs.houseId=this.houseId;

    this.httpService.addHumiditySensor(hs).subscribe(
      success=>{this.newSensor=true;},
      error=>{}) 
      this.humidityForm.resetForm();
  }

  numbersOfTempSensor(event: number)
  {
      this.numberTemperatureSensor=event;
      this.newSensor=false;
  }

}
