import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {
  myRouterLink='/home'
  constructor() { }

  ngOnInit(): void {
  }

}
