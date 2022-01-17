import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetailsDTO } from '../models/UserDetailsDTO';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  userDetails$: Observable<UserDetailsDTO>;

  w = window.innerWidth;
  disableClose: boolean;
  constructor(public dialog: MatDialog, private userService: UsersService) {
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }

    this.userDetails$ = this.userService
      .getUserDetails()
      .pipe(map((response) => response.data as UserDetailsDTO));
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
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
