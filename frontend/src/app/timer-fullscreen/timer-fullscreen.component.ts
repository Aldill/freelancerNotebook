import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-fullscreen',
  templateUrl: './timer-fullscreen.component.html',
  styleUrls: ['./timer-fullscreen.component.css']
})
export class TimerFullscreenComponent implements OnInit {

  constructor() { }
  timeLeft: number = 60;
  interval: any;
  elem: any;

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

startTimer() {
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.timeLeft = 60;
    }
  },1000)
}

pauseTimer() {
  clearInterval(this.interval);
}



}