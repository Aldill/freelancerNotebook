import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


interface NewPasswords {
  old: string;
  new: string;
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  myForm: FormGroup;
  passwords: NewPasswords;
  matcher = new MyErrorStateMatcher();

  
  w = window.innerWidth;
  disableClose: boolean;
  
  
  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private router: Router,
     private formBuilder: FormBuilder
  ) {
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }

    this.user = {} as User;
    this.passwords = {} as NewPasswords;

    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
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







