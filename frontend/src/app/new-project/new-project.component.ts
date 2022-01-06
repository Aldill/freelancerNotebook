import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from '../services/clients.service';
import { ProjectsService } from '../services/projects.service';
import { switchMap } from 'rxjs/operators';

export interface Chip {
  name: string;
}
interface ClientDTO {
  name: string;
  mail: string;
  phone: string;
}

interface ProjectDTO {
  name: string;
  description: string;
  deadline: string;
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  selectable = true;
  removable = true;

  client: ClientDTO;

  project: ProjectDTO;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: Chip[] = [];
  w = window.innerWidth;
  disableClose: boolean;
  constructor(
    public dialog: MatDialog,
    private clientService: ClientsService,
    private projectsService: ProjectsService
  ) {
    this.client = {} as ClientDTO;
    this.project = {} as ProjectDTO;
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

  ngOnInit(): void {}

  saveClientAndProject(): void {
    console.log('test');
    this.clientService
      .createClient(this.client)
      .pipe(
        switchMap((id) =>
          this.projectsService.createNewProject(this.project, id)
        )
      )
      .subscribe({ next: (response) => console.log(response) });
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
