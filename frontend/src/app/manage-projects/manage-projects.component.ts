import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../models/Projects';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css'],
})
export class ManageProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  w = window.innerWidth;
  disableClose: boolean;
  constructor(
    public dialog: MatDialog,
    public projectService: ProjectsService
  ) {
    this.projects$ = projectService.projects$;
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

  panelOpenState = false;
  public isCollapsed = false;
  ngOnInit(): void {}

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
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
