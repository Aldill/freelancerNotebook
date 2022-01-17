import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TimerService } from '../services/timer.service';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  time: Observable<number>;
  w = window.innerWidth;
  disableClose: boolean;
  constructor(public dialog: MatDialog, private timerService: TimerService) {
    this.time = this.timerService.timeLeft$;

    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

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
    this.timerService.startTimer();
  }

  pauseTimer() {
    this.timerService.stopTimer();
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    if (this.cardStyle == 'btn-change') {
      this.cardStyle = 'btn-default';
    } else {
      this.cardStyle = 'btn-change';
    }

    if (this.otherStyle == 'other-change') {
      this.otherStyle = 'other-default';
    } else {
      this.otherStyle = 'other-change';
    }
    if (this.timeStyle == 'time-change') {
      this.timeStyle = 'time-default';
    } else {
      this.timeStyle = 'time-change';
    }
    if (this.navStyle == 'nav-change') {
      this.navStyle = 'nav-default';
    } else {
      this.navStyle = 'nav-change';
    }
  }

  saveEntry(): void {
    this.timerService.saveEntry();
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

    if (this.cardStyle == 'btn-change') {
      this.cardStyle = 'btn-default';
    } else {
      this.cardStyle = 'btn-change';
    }

    if (this.otherStyle == 'other-change') {
      this.otherStyle = 'other-default';
    } else {
      this.otherStyle = 'other-change';
    }
    if (this.timeStyle == 'time-change') {
      this.timeStyle = 'time-default';
    } else {
      this.timeStyle = 'time-change';
    }
    if (this.navStyle == 'nav-change') {
      this.navStyle = 'nav-default';
    } else {
      this.navStyle = 'nav-change';
    }
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
