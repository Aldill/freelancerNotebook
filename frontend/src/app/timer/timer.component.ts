import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }
  seconds: number = 0;
  seconds_zero: any = 0;
  minutes_zero: any = 0;
  hours_zero: any = 0;
  minutes: number = 5;
  hours: number = 0;
  interval: any;
  elem: any;

  cardStyle = 'btn-default';
  timeStyle = 'time-default';
  navStyle = 'nav-default';
  otherStyle = 'other-default';
  isFullscreenVisible = true;
  isFullscreenExitVisible = false;
  
  ngOnInit(): void {
    this.elem = document.documentElement;
  }


  startTimer() {
    this.interval = setInterval(() => {

      
      if(this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes --;
        this.seconds = 59;
      }
      else  if (this.hours > 0) {
        this.hours --;
        this.minutes = 59;
      }
      if(this.seconds >= 10){
        this.seconds_zero = ""
      }else{
        this.seconds_zero = 0
      }
      if(this.minutes >= 10){
        this.minutes_zero = ""
      }else{
        this.minutes_zero = 0
      }
      if(this.hours >= 10){
        this.hours_zero = ""
      }else{
        this.hours_zero = 0
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  /* Close fullscreen */
closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  if(this.cardStyle == 'btn-change') {
    this.cardStyle = 'btn-default';
  } else {
    this.cardStyle = 'btn-change';
  }

  if(this.otherStyle == 'other-change') {
    this.otherStyle = 'other-default';
  } else {
    this.otherStyle = 'other-change';
  }
  if(this.timeStyle == 'time-change') {
    this.timeStyle = 'time-default';
  } else {
    this.timeStyle = 'time-change';
  }
  if(this.navStyle == 'nav-change') {
    this.navStyle = 'nav-default';
  } else {
    this.navStyle = 'nav-change';
  }

  
}
  openFullscreen() {

    
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }

    if(this.cardStyle == 'btn-change') {
      this.cardStyle = 'btn-default';
    } else {
      this.cardStyle = 'btn-change';
    }

    if(this.otherStyle == 'other-change') {
      this.otherStyle = 'other-default';
    } else {
      this.otherStyle = 'other-change';
    }
    if(this.timeStyle == 'time-change') {
      this.timeStyle = 'time-default';
    } else {
      this.timeStyle = 'time-change';
    }
    if(this.navStyle == 'nav-change') {
      this.navStyle = 'nav-default';
    } else {
      this.navStyle = 'nav-change';
    }
  } 
  
  
}

