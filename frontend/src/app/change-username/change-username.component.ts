import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
interface UserNew {
  username: string;
  password: string;
}

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css'],
})
export class ChangeUsernameComponent implements OnInit {
  user: User;

  userNew: UserNew;

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
    this.userNew = {} as UserNew;
    this.userService.getUserData().subscribe((data) => (this.user = data));
  }

  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  updateUsername() {
    this.user = {
      ...this.user,
      username: this.userNew.username,
      password: this.userNew.password,
    };
    this.userService
      .updateUserData(this.user.id, this.user)
      .subscribe((data) => {
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
