import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { delay, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Entry } from '../models/Entry';
import { Project } from '../models/Projects';
import { EntriesService } from '../services/entries.service';
import { ProjectsService } from '../services/projects.service';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project$: Observable<Project[]>;

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

    this.project$ = activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id === null) {
          return EMPTY;
        }
        return this.projectService.getProject(id);
      }),
      shareReplay()
    );

    this.entries$ = this.project$.pipe(
      switchMap((project) =>
        this.entriesService.getEntriesFromProject(project[0].id)
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
