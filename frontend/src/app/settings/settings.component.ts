import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { ProjectsService } from '../services/projects.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  w = window.innerWidth;
  disableClose: boolean;
  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private projectsService: ProjectsService
  ) {
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  logout(): void {
    this.loginService.logout();
  }

  deleteAllProjects(): void {
    this.projectsService.deleteAllProjects().subscribe();
  }
  clickMethod(name: string, action: string) {
    if (confirm('Are you sure you want to ' + action + ' ' + name)) {
      if (action == 'permanently delete') {
        console.log('Implement delete functionality here');
      }

      if (action == 'permanently reset all your progress?') {
        this.deleteAllProjects();
      }
    }
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
