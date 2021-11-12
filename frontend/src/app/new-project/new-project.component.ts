import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Chip {
  name: string;
}
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: Chip[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our chip
    if (value) {
      this.chips.push({name: value});
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
}
