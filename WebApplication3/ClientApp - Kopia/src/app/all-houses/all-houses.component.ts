import { Component, OnInit} from '@angular/core';
import { HttpService } from '../Service/http.service';
import { Observable } from 'rxjs';
import { House } from '../app.component';
@Component({
  selector: 'app-all-houses',
  templateUrl: './all-houses.component.html',
  styleUrls: ['./all-houses.component.css']
})
export class AllHousesComponent implements OnInit{

selectedHouse: number;
lastOperationHouse: number = null;
lastOperationNumber:number=null;
operacja: number;
allHouses$: Observable<Array<House>>

  constructor(private httpService: HttpService) { }
  
  
    ngOnInit(): void {
     this.allHouses$ = this.httpService.getHouses()
    }

    addSensorOption(houseId)
    {
      this.selectedHouse=houseId
      if( this.lastOperationHouse==this.selectedHouse)
      {
        if(this.lastOperationNumber==1)
        {
          this.operacja=0;
          this.lastOperationNumber=0;
          this.lastOperationHouse=null;
        }
        else
        {
          this.operacja=1;
          this.lastOperationNumber=1;
        }
      }
      else
      {
        this.operacja=1;
        this.lastOperationNumber=1;
        this.lastOperationHouse=this.selectedHouse;
      }
 
    }
    statusSensorOption(houseId)
    {
      this.selectedHouse=houseId
      if( this.lastOperationHouse==this.selectedHouse)
      {
        if(this.lastOperationNumber==2)
        {
          this.operacja=0;
          this.lastOperationHouse=null;
        }
        else
        {
          this.operacja=2;
          this.lastOperationNumber=2;
        }

      }
      else
      {
        this.operacja=2;
        this.lastOperationNumber=2;
        this.lastOperationHouse=this.selectedHouse;
      }
    }
    layoutSensorOption(houseId)
    {
      this.selectedHouse=houseId
      if( this.lastOperationHouse==this.selectedHouse)
      {
        if(this.lastOperationNumber==3)
        {
          this.operacja=0;
          this.lastOperationHouse=null;
        }
        else
        {
          this.operacja=3;
          this.lastOperationNumber=3;
        }

      }
      else
      {
        this.operacja=3;
        this.lastOperationNumber=3;
        this.lastOperationHouse=this.selectedHouse;
      }
    }
    delHouse(houseId)
    {
      this.httpService.delHouse(houseId).subscribe(
        success=>{

          this.allHouses$ = this.httpService.getHouses()
        },
        error=>{console.log(error)}
      );
      
    }

   
  }
