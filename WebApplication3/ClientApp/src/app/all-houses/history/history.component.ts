import { Component, OnInit, Input } from '@angular/core';
import { TemperatureSensor } from 'src/app/app.component';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input()
  houseId: number;
  sensors$
  constructor(private httpService: HttpService) { }

  temperatureSensors: TemperatureSensor[] = new Array<TemperatureSensor>();
  numery: number[] = [65, 59, 80, 81, 56, 55, 40]
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'line';
  public barChartFill= false;
  public barChartlegend=true;
  public barChartData = [    
      {data: this.numery, label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  ngOnInit() {
    this.sensors$ = this.httpService.getSensorsByHouseId(this.houseId);
    console.log(this.sensors$);
  }

}
