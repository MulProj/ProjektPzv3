import { Component, Input, ViewChild, HostListener, ElementRef} from '@angular/core';
import { HumiditySensor, TemperatureSensor, SmokeSensor, MotionSensor } from 'src/app/app.component';
import { HttpService } from '../../Service/http.service';


@Component({
  selector: 'app-add-sensors',
  templateUrl: './add-sensors.component.html',
  styleUrls: ['./add-sensors.component.css']
})
export class AddSensorsComponent{

  @Input()
  houseId: number;
  @Input()
  plan: string;

  @ViewChild('tempForm') tempForm;
  @ViewChild('smokeForm') smokeForm;
  @ViewChild('humidityForm') humidityForm;
  @ViewChild('motionForm') motionForm;
  @ViewChild('canvas') canvas: ElementRef;

  public ctx: CanvasRenderingContext2D;

  motionSensors: MotionSensor[] = new Array<MotionSensor>();
  smokeSensors: SmokeSensor[] = new Array<SmokeSensor>();
  humiditySensors: HumiditySensor[] = new Array<HumiditySensor>();
  temperatureSensors: TemperatureSensor[] = new Array<TemperatureSensor>();

  temperatureSensors$;
  humiditySensors$;
  smokeSensors$;
  motionSensors$;

  mouseX: number;
  mouseY: number;
  dragSensorX: number;
  dragSensorY: number;
  drag: boolean = false;
  index:number;
  type: string;


temperatureSensor =new Image
humiditySensor = new Image
smokeSensor = new Image
motionSensor = new Image

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.temperatureSensor.src="../../../assets/sensor/temp.png";
    this.humiditySensor.src="../../../assets/sensor/hum.png";
    this.smokeSensor.src="../../../assets/sensor/smoke.png";
    this.motionSensor.src="../../../assets/sensor/move.png";
    
    
    this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.temperatureSensors$ = this.httpService.getTemperatureSensorsByHouseId(this.houseId)
    this.smokeSensors$ = this.httpService.getSmokeSensorsByHouseId(this.houseId);
    this.humiditySensors$ = this.httpService.getHumiditySensorsByHouseId(this.houseId);
    this.motionSensors$ = this.httpService.getMotionSensorsByHouseId(this.houseId);
    
    this.load();
    this.drawSensors(); 
    }

    ngAfterViewInit(): void {
      this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
      this.load();
    }


  //stan: number = 0;

  numberTemperatureSensor: number
  newHumiditySensor : HumiditySensor = new HumiditySensor();
  newTemperatureSensor : TemperatureSensor = new TemperatureSensor();
  newSmokeSensor : SmokeSensor = new SmokeSensor();
  newMotionSensor : MotionSensor = new MotionSensor();

  addTempSensor(ts: TemperatureSensor)
  {
    ts.coordinateX=10;
    ts.coordinateY=10;
    ts.houseId=this.houseId;
    this.httpService.addTemperatureSensor(ts).subscribe(
      success=>{this.load();},
      error=>{})  
      this.tempForm.resetForm(); 
  }
  addMotionSensor(ms : MotionSensor)
  {
    ms.coordinateX=10;
    ms.coordinateY=10;
    ms.houseId=this.houseId;
    this.httpService.addMotionSensor(ms).subscribe(
      success=>{this.load();},
      error=>{})   
      this.motionForm.resetForm();
  }
  addSmokeSensor(ss: SmokeSensor)
  {
    ss.coordinateX= 10;
    ss.coordinateY=10;
    ss.houseId=this.houseId;
    this.httpService.addSmokeSensor(ss).subscribe(
      success=>{this.load();},
      error=>{}) 
      this.smokeForm.resetForm();
  }
  addHumiditySensor(hs: HumiditySensor)
  {
    hs.coordinateX=10;
    hs.coordinateY=10;
    hs.houseId=this.houseId;
    this.httpService.addHumiditySensor(hs).subscribe(
      success=>{this.load();},
      error=>{}) 
      this.humidityForm.resetForm();
  }



/************************************************8 */




//sensors$






load()
{
  this.temperatureSensors$.subscribe(sensors =>{
    for(var i =0; i<sensors.length; i++)
    {
      while(this.temperatureSensors.length<sensors.length)
      {
        var ts: TemperatureSensor=({
          temperature: sensors[i].temperature,
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
      }
      this.temperatureSensors[i].temperature=sensors[i].temperature;
      this.temperatureSensors[i].sensorId= sensors[i].sensorId;
      this.temperatureSensors[i].coordinateX= sensors[i].coordinateX;
      this.temperatureSensors[i].coordinateY= sensors[i].coordinateY;
      this.temperatureSensors[i].type= sensors[i].type;
      this.temperatureSensors[i].maxValue= sensors[i].maxValue;
      this.temperatureSensors[i].minValue= sensors[i].minValue;
      this.temperatureSensors[i].isOn= sensors[i].isOn;
      this.temperatureSensors[i].name= sensors[i].name;
      this.temperatureSensors[i].houseId= sensors[i].houseId;
  
    }
    this.drawTemperatureSensors();
  })
  
  this.smokeSensors$.subscribe(sensors =>{
    for(var i =0; i<sensors.length; i++)
    {
      while(this.smokeSensors.length<sensors.length){
        var ss: SmokeSensor=({
          smoke: sensors[i].smoke,
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
      }
      this.smokeSensors[i].smoke= sensors[i].smoke;
      this.smokeSensors[i].sensorId= sensors[i].sensorId;
      this.smokeSensors[i].coordinateX= sensors[i].coordinateX;
      this.smokeSensors[i].coordinateY= sensors[i].coordinateY;
      this.smokeSensors[i].type= sensors[i].type;
      this.smokeSensors[i].maxValue= sensors[i].maxValue;
      this.smokeSensors[i].minValue= sensors[i].minValue;
      this.smokeSensors[i].isOn= sensors[i].isOn;
      this.smokeSensors[i].name= sensors[i].name;
      this.smokeSensors[i].houseId= sensors[i].houseId;
  
  
    }
    this.drawSmokeSensors();
  })
  
  this.humiditySensors$.subscribe(sensors =>{
    for(var i =0; i<sensors.length; i++)
    {
      while(this.humiditySensors.length<sensors.length){
        var hs: HumiditySensor=({
          humidity: sensors[i].humidity,
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
      }
      this.humiditySensors[i].humidity= sensors[i].humidity;
      this.humiditySensors[i].sensorId= sensors[i].sensorId;
      this.humiditySensors[i].coordinateX= sensors[i].coordinateX;
      this.humiditySensors[i].coordinateY= sensors[i].coordinateY;
      this.humiditySensors[i].type= sensors[i].type;
      this.humiditySensors[i].maxValue= sensors[i].maxValue;
      this.humiditySensors[i].minValue= sensors[i].minValue;
      this.humiditySensors[i].isOn= sensors[i].isOn;
      this.humiditySensors[i].name= sensors[i].name;
      this.humiditySensors[i].houseId= sensors[i].houseId;
  
      }
      this.drawHumiditySensors();
  })
  
  this.motionSensors$.subscribe(sensors =>{
    for(var i =0; i<sensors.length; i++)
    {
      while(this.motionSensors.length<sensors.length)
      {
      var ms: MotionSensor=({
        isMove: sensors[i].isMove,
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
    }
    this.motionSensors[i].isMove= sensors[i].isMove;
    this.motionSensors[i].sensorId= sensors[i].sensorId;
    this.motionSensors[i].coordinateX= sensors[i].coordinateX;
    this.motionSensors[i].coordinateY= sensors[i].coordinateY;
    this.motionSensors[i].type= sensors[i].type;
    this.motionSensors[i].maxValue= sensors[i].maxValue;
    this.motionSensors[i].minValue= sensors[i].minValue;
    this.motionSensors[i].isOn= sensors[i].isOn;
    this.motionSensors[i].name= sensors[i].name;
    this.motionSensors[i].houseId= sensors[i].houseId;
  
    }
    this.drawMotionSensors();
  })

}


@HostListener('dblclick' ['$event'])
onDblClick(event: MouseEvent)
{
  console.log("2x");
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
        this.dragSensorY=this.mouseY-this.temperatureSensors[this.index].coordinateY;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
      case "Humidity": { 
        this.dragSensorX=this.mouseX-this.humiditySensors[this.index].coordinateX;
        this.dragSensorY=this.mouseY-this.humiditySensors[this.index].coordinateY;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
      case "Smoke": { 
        this.dragSensorX=this.mouseX-this.smokeSensors[this.index].coordinateX;
        this.dragSensorY=this.mouseY-this.smokeSensors[this.index].coordinateY;
        console.log(this.type+" drag:"+this.drag+" id: "+this.index )
        break; 
      } 
      case "Motion": { 
        this.dragSensorX=this.mouseX-this.motionSensors[this.index].coordinateX;
        this.dragSensorY=this.mouseY-this.motionSensors[this.index].coordinateY;
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





