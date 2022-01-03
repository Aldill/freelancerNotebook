import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {

  w = window.innerWidth;
  disableClose:boolean;
  constructor() { 
    if (this.w > 450) {
      this.disableClose=true;
    } else {
      this.disableClose=false;
    }

  }

  panelOpenState = false;
  public isCollapsed = false;
  ngOnInit(): void {
  }

  togglePanel() {
      this.panelOpenState = !this.panelOpenState
  }

}
