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

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css'],
})
export class NewEntryComponent implements OnInit {
  myRouterLink = '/home';

  projects$: Observable<Project[]>;

  timedEntry: boolean;

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
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

  ngOnInit(): void {}

  addStartDate(): void {
    this.entry.startDate = new Date().toISOString();
    if (!this.timedEntry) {
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
