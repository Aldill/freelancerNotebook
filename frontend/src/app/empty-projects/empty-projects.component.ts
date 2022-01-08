import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-empty-projects',
  templateUrl: './empty-projects.component.html',
  styleUrls: ['./empty-projects.component.css']
})

export class EmptyProjectsComponent implements OnInit {


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

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
