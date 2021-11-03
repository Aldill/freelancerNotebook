import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }
  timeLeft: number = 60;
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

