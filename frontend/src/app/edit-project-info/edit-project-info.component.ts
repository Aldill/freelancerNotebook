import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-project-info',
  templateUrl: './edit-project-info.component.html',
  styleUrls: ['./edit-project-info.component.css']
})
export class EditProjectInfoComponent implements OnInit {

  w = window.innerWidth;
  disableClose:boolean;
  constructor() { 
    if (this.w > 450) {
      this.disableClose=true;
    } else {
      this.disableClose=false;
    }

  }
  ngOnInit(): void {
  }

}
