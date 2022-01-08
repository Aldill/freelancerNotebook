import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';

interface NewPasswords {
  old: string;
  new: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: User;

  passwords: NewPasswords;

  w = window.innerWidth;
  disableClose: boolean;
  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private router: Router
  ) {
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }

    this.user = {} as User;
    this.passwords = {} as NewPasswords;
  }

  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  changePassword() {
    this.userService.updateUserPassword(this.passwords).subscribe((data) => {
      if (data) {
        this.router.navigate(['settings']);
      }
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
