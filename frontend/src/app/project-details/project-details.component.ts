import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

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
  clickMethod(name: string, action: string) {
    if(confirm("Are you sure you want to "+ action+" project "+name+"?")) {
      console.log("Implement delete functionality here");
    }
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  
  openSummary() {
    this.dialog.open(Summary);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}

@Component({
  selector: 'summary',
  templateUrl: '../summary.html',
})
export class Summary {}

   