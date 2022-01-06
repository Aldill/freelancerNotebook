import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-project-info',
  templateUrl: './edit-project-info.component.html',
  styleUrls: ['./edit-project-info.component.css']
})
export class EditProjectInfoComponent implements OnInit {

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

   