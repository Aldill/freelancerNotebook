import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Project } from '../models/Projects';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-edit-project-info',
  templateUrl: './edit-project-info.component.html',
  styleUrls: ['./edit-project-info.component.css'],
})
export class EditProjectInfoComponent implements OnInit {
  project$: Observable<Project>;

  projectChangedValues: Project;
  w = window.innerWidth;
  disableClose: boolean;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private router: Router
  ) {
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }

    this.projectChangedValues = {} as Project;
    this.project$ = activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id === null) {
          return EMPTY;
        }
        return this.projectService.getProject(id);
      }),
      tap((data) => {
        this.projectChangedValues = data;
      })
    );
  }
  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  updateProjectData(id: string): void {
    this.projectService
      .updateProject(id, this.projectChangedValues)
      .subscribe((data) => {
        {
          if (data) {
            this.router.navigate(['/project-details', id]);
          }
        }
      });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
