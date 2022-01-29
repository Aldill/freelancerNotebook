import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { delay, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Entry } from '../models/Entry';
import { ProjectDetails } from '../models/ProjectDetails';
import { Project } from '../models/Projects';
import { EntriesService } from '../services/entries.service';
import { ProjectsService } from '../services/projects.service';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project$: Observable<Project>;

  projectId: string;
  entries$: Observable<Entry[]>;

  w = window.innerWidth;
  disableClose: boolean;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private entriesService: EntriesService
  ) {
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
    this.projectId = '';

    this.project$ = activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        this.projectId = id as string;
        if (id === null) {
          return EMPTY;
        }
        return this.projectService.getProject(id);
      }),
      shareReplay()
    );

    this.entries$ = this.project$.pipe(
      switchMap((project) =>
        this.entriesService.getEntriesFromProject(project.id)
      )
    );
  }

  ngOnInit(): void {}
  clickMethod(name: string, action: string) {
    if (
      confirm('Are you sure you want to ' + action + ' project ' + name + '?')
    ) {
      console.log('Implement delete functionality here');
    }
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  openSummary() {
    this.dialog.open(Summary, { data: this.projectId });
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
export class Summary {
  data$: Observable<ProjectDetails>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public projectId: string,
    private projectService: ProjectsService
  ) {
    this.data$ = this.projectService.getProjectDetails(projectId);
    console.log(projectId);
  }
}
