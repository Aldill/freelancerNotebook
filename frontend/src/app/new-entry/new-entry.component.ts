import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from '../services/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../models/Projects';
import { EntriesService } from '../services/entries.service';
export interface Chip {
  name: string;
}
interface EntryDTO {
  projectId: string;
  description: string;
  startDate: string;
  fee: number;
  isFlatFee: boolean;
  endDate: string;
}

interface EntryTime {
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css'],
})
export class NewEntryComponent implements OnInit {
  myRouterLink = '/home';

  projects$: Observable<Project[]>;

  timedEntry: boolean;

  entryTime: EntryTime;

  entry: EntryDTO;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: Chip[] = [];
  w = window.innerWidth;
  disableClose: boolean;

  constructor(
    public dialog: MatDialog,
    private projectsService: ProjectsService,
    private entriesService: EntriesService
  ) {
    this.timedEntry = false;
    this.projects$ = projectsService.projects$;
    this.entry = {} as EntryDTO;
    this.entryTime = {} as EntryTime;
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

  ngOnInit(): void {}

  addStartDate(): void {
    const startDate = new Date();
    this.entry.startDate = startDate.toISOString();
    if (!this.timedEntry) {
      const endDate = startDate.setSeconds(
        startDate.getSeconds() +
          parseFloat(this.entryTime.hours) * 3600 +
          parseFloat(this.entryTime.minutes) * 60 +
          parseFloat(this.entryTime.seconds)
      );
      this.entry.endDate = new Date(endDate).toISOString();
      this.entriesService.saveEntry(this.entry);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our chip
    if (value) {
      this.chips.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(chip: Chip): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
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
