import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeLeft: number = 60;
  interval;
  a=5;
  b;
  f(){
    this.a++;
  }

  constructor() { }

  ngOnInit() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.f()
        } else {
          this.timeLeft = 60;
        }
      },1000)


  

}

}
