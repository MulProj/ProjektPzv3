import { Component, OnInit, ViewChild } from '@angular/core';
import { House} from '../app.component';
import { HttpService } from '../Service/http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent {
  constructor (private httpService: HttpService, private domSanitizer: DomSanitizer){}

  @ViewChild('houseForm') houseForm;
  
  newHouse: House = new House();
  imgInBase64;
  stan: number = null; 

  
 getBase64(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=> {
      this.newHouse.image=reader.result.toString();
    };
    reader.onerror = function (error) {
    console.log('Error: ', error);
    };
}

addHouse(h: House){
  this.httpService.addHouse(h).subscribe(
    success=>{ this.stan=1 },
    error=>{ this.stan=2 })

    this.houseForm.resetForm();

  }
}

    
      








