import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  w = window.innerWidth;
  disableClose:boolean;
  constructor(public dialog: MatDialog) { 
    if (this.w > 450) {
      this.disableClose=true;
    } else {
      this.disableClose=false;
    }

  }


  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  clickMethod(name: string, action: string) {

    if(confirm("Are you sure you want to " + action + " " +name)) {

      if(action=="permanently delete"){
      console.log("Implement delete functionality here");}

      if(action=="permanently reset all your progress?"){
        console.log("Implement reset functionality here");}
  
    }
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}

   