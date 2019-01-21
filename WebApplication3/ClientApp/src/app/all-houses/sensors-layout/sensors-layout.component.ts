import { Component, OnInit, Output, ViewChild, ElementRef, HostListener, SimpleChanges, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../Service/http.service';
import { Sensor, MotionSensor, SmokeSensor, HumiditySensor, TemperatureSensor } from 'src/app/app.component';

@Component({
  selector: 'app-sensors-layout',
  templateUrl: './sensors-layout.component.html',
  styleUrls: ['./sensors-layout.component.css']
})
export class SensorsLayoutComponent {
constructor(private domSanitizer: DomSanitizer, private httpService: HttpService){
  
}
@Input()
  houseId: number;
@Input()
  plan: string;
@Input()
  newSensor: boolean;

@Output()
  eventNumbersOfTempSensor = new EventEmitter<number>();
ngOnChanges(changes: SimpleChanges)
{
  console.log("próba");
  if(this.newSensor==true)
  {
    console.log("zmiana");
    this.ngOnInit();
    
  }
  

  
}

//sensors: Sensor[]= new Array<Sensor>();

motionSensors: MotionSensor[] = new Array<MotionSensor>();
smokeSensors: SmokeSensor[] = new Array<SmokeSensor>();
humiditySensors: HumiditySensor[] = new Array<HumiditySensor>();
temperatureSensors: TemperatureSensor[] = new Array<TemperatureSensor>();

sensors$

mouseX: number;
mouseY: number;
dragSensorX: number;
dragSensorY: number;
drag: boolean = false;
index:number;

type: string;

@ViewChild('canvas') canvas: ElementRef;
temperatureSensor =new Image
humiditySensor = new Image
smokeSensor = new Image
motionSensor = new Image

public ctx: CanvasRenderingContext2D;

ngAfterViewInit(): void {
  this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
  console.log(this.newSensor);

  
console.log(this.canvas);
}
ngOnInit(): void {
  console.log("ngOnInit");
  this.newSensor=false;
this.temperatureSensor.src="../../../assets/sensor/temp.png";
this.humiditySensor.src="../../../assets/sensor/hum.png";
this.smokeSensor.src="../../../assets/sensor/smoke.png";
this.motionSensor.src="../../../assets/sensor/move.png";


this.sensors$ = this.httpService.getSensorsByHouseId(this.houseId);

 this.sensors$.subscribe(sensors => {
  for(var i =0; i<sensors.length; i++)
  {
    switch(sensors[i].type)
    {
      case "Temperature": { 
        var ts: TemperatureSensor=({
          sensorId: sensors[i].sensorId,
          coordinateX: sensors[i].coordinateX,
          coordinateY: sensors[i].coordinateY,
          type: sensors[i].type,
          maxValue: sensors[i].maxValue,
          minValue: sensors[i].minValue,
          isOn: sensors[i].isOn,
          name: sensors[i].name,
          houseId: sensors[i].houseId,
        })
        this.temperatureSensors.push(ts);
        break; 
      } 
      case "Humidity": { 
        var hs: HumiditySensor=({
          sensorId: sensors[i].sensorId,
          coordinateX: sensors[i].coordinateX,
          coordinateY: sensors[i].coordinateY,
          type: sensors[i].type,
          maxValue: sensors[i].maxValue,
          minValue: sensors[i].minValue,
          isOn: sensors[i].isOn,
          name: sensors[i].name,
          houseId: sensors[i].houseId,
        })
        this.humiditySensors.push(hs);
        break; 
      } 
      case "Smoke": { 
        var ss: SmokeSensor=({
          sensorId: sensors[i].sensorId,
          coordinateX: sensors[i].coordinateX,
          coordinateY: sensors[i].coordinateY,
          type: sensors[i].type,
          maxValue: sensors[i].maxValue,
          minValue: sensors[i].minValue,
          isOn: sensors[i].isOn,
          name: sensors[i].name,
          houseId: sensors[i].houseId,
        })
        this.smokeSensors.push(ss);
        break; 
      } 
      case "Motion": { 
        var ms: MotionSensor=({
          sensorId: sensors[i].sensorId,
          coordinateX: sensors[i].coordinateX,
          coordinateY: sensors[i].coordinateY,
          type: sensors[i].type,
          maxValue: sensors[i].maxValue,
          minValue: sensors[i].minValue,
          isOn: sensors[i].isOn,
          name: sensors[i].name,
          houseId: sensors[i].houseId,
        })
        this.motionSensors.push(ms);
        
        break; 
      } 

    }
    this.eventNumbersOfTempSensor.emit(this.temperatureSensors.length);
  }
  console.log(this.temperatureSensors)
  this.drawSensors();  
})


}

@HostListener('mousemove', ['$event']) 
onmousemove(event: MouseEvent)
{
  this.mouseX=event.x-this.canvas.nativeElement.getBoundingClientRect().x;
  this.mouseY=event.y-this.canvas.nativeElement.getBoundingClientRect().y;
  if(this.drag==true)
  {
    switch(this.type) {
      case "Temperature" :{
        console.log("ruszyło");
        this.temperatureSensors[this.index].coordinateX= this.mouseX-this.dragSensorX;
        this.temperatureSensors[this.index].coordinateY=this.mouseY-this.dragSensorY;
        this.drawSensors();
        break;
      }
      case "Motion" :{
        this.motionSensors[this.index].coordinateX= this.mouseX-this.dragSensorX;
        this.motionSensors[this.index].coordinateY=this.mouseY-this.dragSensorY;
        this.drawSensors();
        break;
      }
      case "Smoke" :{
        this.smokeSensors[this.index].coordinateX= this.mouseX-this.dragSensorX;
        this.smokeSensors[this.index].coordinateY=this.mouseY-this.dragSensorY;
        this.drawSensors();
        break;
      }
      case "Humidity" :{
        this.humiditySensors[this.index].coordinateX= this.mouseX-this.dragSensorX;
        this.humiditySensors[this.index].coordinateY=this.mouseY-this.dragSensorY;
        this.drawSensors();
        break;
      }
    }
  }
}

@HostListener('mousedown', ['$event'])
onmousedown()
{
  if(this.inSensors())
  {
    this.drag=true;
    switch(this.type){
      case "Temperature": { 
        this.dragSensorX=this.mouseX-this.temperatureSensors[this.index].coordinateX;
        this.dragSensorY=this.mouseX-this.temperatureSensors[this.index].coordinateX;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
      case "Humidity": { 
        this.dragSensorX=this.mouseX-this.humiditySensors[this.index].coordinateX;
        this.dragSensorY=this.mouseX-this.humiditySensors[this.index].coordinateX;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
      case "Smoke": { 
        this.dragSensorX=this.mouseX-this.smokeSensors[this.index].coordinateX;
        this.dragSensorY=this.mouseX-this.smokeSensors[this.index].coordinateX;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
      case "Motion": { 
        this.dragSensorX=this.mouseX-this.motionSensors[this.index].coordinateX;
        this.dragSensorY=this.mouseX-this.motionSensors[this.index].coordinateX;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
    }

  }
  else
  {
    this.index=null;
    this.drag=false;
  }
  
}


@HostListener('mouseup')
onmouseup()
{
  this.saveSensors();
  this.index=null;
  this.drag=false;
  this.type=null;
  console.log(this.index+" "+this.drag+" "+this.type)
}

inSensors()
{
  
  for(var i = 0; i<this.temperatureSensors.length; i++)
  {
    if(this.temperatureSensors[i].coordinateX<=this.mouseX && this.temperatureSensors[i].coordinateX+35>=this.mouseX)
    {
      if(this.temperatureSensors[i].coordinateY<=this.mouseY && this.temperatureSensors[i].coordinateY+35>=this.mouseY)
      {
        this.index=i;
        this.type="Temperature";
        console.log("temp");
        console.log(this.index+" "+this.drag+" "+this.type)

      }
    }
  }
  for(var i = 0; i<this.humiditySensors.length; i++)
  {
    if(this.humiditySensors[i].coordinateX<=this.mouseX && this.humiditySensors[i].coordinateX+35>=this.mouseX)
    {
      if(this.humiditySensors[i].coordinateY<=this.mouseY && this.humiditySensors[i].coordinateY+35>=this.mouseY)
      {
        this.index=i;
        this.type="Humidity";
        console.log("hum");
        console.log(this.index+" "+this.drag+" "+this.type)
      }
    }
  }
  for(var i = 0; i<this.smokeSensors.length; i++)
  {
    if(this.smokeSensors[i].coordinateX<=this.mouseX && this.smokeSensors[i].coordinateX+35>=this.mouseX)
    {
      if(this.smokeSensors[i].coordinateY<=this.mouseY && this.smokeSensors[i].coordinateY+35>=this.mouseY)
      {
        this.index=i;
        this.type="Smoke";
        console.log("smoke");
        console.log(this.index+" "+this.drag+" "+this.type)
        
      }
    }
  }
  for(var i = 0; i<this.motionSensors.length; i++)
  {
    if(this.motionSensors[i].coordinateX<=this.mouseX && this.motionSensors[i].coordinateX+35>=this.mouseX)
    {
      if(this.motionSensors[i].coordinateY<=this.mouseY && this.motionSensors[i].coordinateY+35>=this.mouseY)
      {
        this.index=i;
        this.type="Motion";
        console.log("motion");
        console.log(this.index+" "+this.drag+" "+this.type)
      }
    }
  }
  if(this.index!=null)
    return true;
  else
    return false;
  
}




drawTemperatureSensors(){
  for(var i=0; i<this.temperatureSensors.length; i++)
    this.ctx.drawImage(this.temperatureSensor, this.temperatureSensors[i].coordinateX, this.temperatureSensors[i].coordinateY, 35, 35);
}
drawHumiditySensors(){
  for(var i=0; i<this.humiditySensors.length; i++)
    this.ctx.drawImage(this.humiditySensor, this.humiditySensors[i].coordinateX, this.humiditySensors[i].coordinateY, 35, 35);
}
drawSmokeSensors(){
  for(var i=0; i<this.smokeSensors.length; i++)
    this.ctx.drawImage(this.smokeSensor, this.smokeSensors[i].coordinateX, this.smokeSensors[i].coordinateY, 35, 35);
}
drawMotionSensors(){
  for(var i=0; i<this.motionSensors.length; i++)
    this.ctx.drawImage(this.motionSensor, this.motionSensors[i].coordinateX, this.motionSensors[i].coordinateY, 35, 35);
}
drawSensors()
{ 
  this.ctx.clearRect(0, 0, 800, 600);
  this.drawHumiditySensors();
  this.drawMotionSensors();
  this.drawSmokeSensors();
  this.drawTemperatureSensors();
}





saveSensors(){
  switch(this.type){
    case "Temperature" :{
      this.httpService.updateTemperatureSensor(this.temperatureSensors[this.index]).subscribe(
        (value)=>{},
        (error)=>{},
       );
       console.log(this.temperatureSensors[this.index]);
       break; 
    }
    case "Humidity" :{
      this.httpService.updateHumiditySensor(this.humiditySensors[this.index]).subscribe(
        (value)=>{},
        (error)=>{},
       );
       break; 
    }
    case "Smoke" :{
      this.httpService.updateSmokeSensor(this.smokeSensors[this.index]).subscribe(
        (value)=>{},
        (error)=>{},
      );
      break; 
    }
    case "Motion" :{
      this.httpService.updateMotionSensor(this.motionSensors[this.index]).subscribe(
        (value)=>{},
        (error)=>{},
      );
      break; 
    }
    default :{
      break;
    }
  }
}
}

