import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/Service/http.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent  {

  @Input()
  houseId: number;
  sensors$
  numberOfValues: number =0;
  
  userNumbers: number;
  timeLeft: number = 60;
  interval;
  index: number=1;



  constructor(private httpService: HttpService) { }
  jedziem() {
      while(this.tempLineChartLabels.length<this.numberOfValues)
      {
       
      this.tempLineChartLabels.push(this.index.toString());
      this.smoLineChartLabels.push(this.index.toString());
      this.humLineChartLabels.push(this.index.toString());
      this.motLineChartLabels.push(this.index.toString());
      this.index++;
      }
      while(this.tempLineChartLabels.length>this.numberOfValues)
      {
       
      this.tempLineChartLabels.pop();
      this.smoLineChartLabels.pop();
      this.humLineChartLabels.pop();
      this.motLineChartLabels.pop();
      this.index--;
      }

    

    
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.sensors$ = this.httpService.getTemperatureHistoryByHouseId(this.houseId, this.numberOfValues);
        this.sensors$.subscribe(sensors =>{

     let _tempLineChartData:Array<any> = new Array(this.tempLineChartData.length);
     for (let i = 0; i < this.tempLineChartData.length; i++) {
      _tempLineChartData[i] = {data: new Array(this.tempLineChartData[i].data.length), label: this.tempLineChartData[i].label};
       for (let j = 0; j < sensors.length; j++) {
        _tempLineChartData[i].data[j] = sensors[j].temperature;
       
     }
    }
     this.tempLineChartData = _tempLineChartData;
   } )

   this.sensors$ = this.httpService.getHumidityHistoryByHouseId(this.houseId, this.numberOfValues);
        this.sensors$.subscribe(sensors =>{

     let _humLineChartData:Array<any> = new Array(this.humLineChartData.length);
     for (let i = 0; i < this.humLineChartData.length; i++) {
      _humLineChartData[i] = {data: new Array(this.humLineChartData[i].data.length), label: this.humLineChartData[i].label};
       for (let j = 0; j < sensors.length; j++) {
        _humLineChartData[i].data[j] = sensors[j].humidity;
       
     }
    }
     this.humLineChartData =  _humLineChartData;
   } )


      this.sensors$ = this.httpService.getSmokeHistoryByHouseId(this.houseId, this.numberOfValues);
        this.sensors$.subscribe(sensors =>{

     let _smoLineChartData:Array<any> = new Array(this.smoLineChartData.length);
     for (let i = 0; i < this.smoLineChartData.length; i++) {
      _smoLineChartData[i] = {data: new Array(this.smoLineChartData[i].data.length), label: this.smoLineChartData[i].label};
       for (let j = 0; j < sensors.length; j++) {
        _smoLineChartData[i].data[j] = sensors[j].smoke;
       
     }
    }
    
     this.smoLineChartData =  _smoLineChartData;
    } )

     this.sensors$ = this.httpService.getMotionHistoryByHouseId(this.houseId, this.numberOfValues);
     this.sensors$.subscribe(sensors =>{

  let _motLineChartData:Array<any> = new Array(this.motLineChartData.length);
  for (let i = 0; i < this.smoLineChartData.length; i++) {
    _motLineChartData[i] = {data: new Array(this.motLineChartData[i].data.length), label: this.motLineChartData[i].label};
    for (let j = 0; j < sensors.length; j++) {
      _motLineChartData[i].data[j] = sensors[j].isMove;
    }
 }
 this.motLineChartData =  _motLineChartData;
     }) 

     console.log("Smoke: ");
     console.log(this.smoLineChartData)
   
    
    
       }   else {
    this.timeLeft = 60;
  }
}, 2000)

}


//Wykres czujnika temperatury
  public tempLineChartData:Array<any> = [{data: [], label: 'Poziom temperatury w mieszkaniu'},];
  public tempLineChartLabels:Array<any> = [];
  public tempLineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public tempLineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(255,78,87,0.2)',
      borderColor: 'rgba(255,78,87,1)',
      pointBackgroundColor: 'rgba(255,78,87,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,78,87,0.8)'
    }
  ];
  public tempLineChartLegend:boolean = true;
  public tempLineChartType:string = 'line';

  //Wykres czujnika wilgotności

  public humLineChartData:Array<any> = [{data: [], label: 'Poziom wilgotności w mieszkaniu'},];
  public humLineChartLabels:Array<any> = [];
  public humLineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public humLineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(67,99,255,0.2)',
      borderColor: 'rgba(67,99,255,1)',
      pointBackgroundColor: 'rgba(67,99,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(67,99,255,0.8)'
    },

  ];
  public humLineChartLegend:boolean = true;
  public humLineChartType:string = 'line';

    //Wykres czujnika dymu

    public smoLineChartData:Array<any> = [{data: [], label: 'Poziom dymu w mieszkaniu'},];
    public smoLineChartLabels:Array<any> = [];
    public smoLineChartOptions:any = {
      responsive: true,
      maintainAspectRatio: false
    };
    public smoLineChartColors:Array<any> = [
      { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    public smoLineChartLegend:boolean = true;
    public smoLineChartType:string = 'line';

  //Wykres czujnika ruchu

  public motLineChartData:Array<any> = [{data: [], label: 'Stany czujnika ruchu'},];
  public motLineChartLabels:Array<any> = [];
  public motLineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public motLineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(56,195,0,0.2)',
      borderColor: 'rgba(56,195,0,1)',
      pointBackgroundColor: 'rgba(56,195,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(56,195,0,0.8)'
    }
  ];
  public motLineChartLegend:boolean = true;
  public motLineChartType:string = 'line';
 
  

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);

}

zmienParametry(){
  this.numberOfValues = this.userNumbers;
  this.jedziem();
}

}
