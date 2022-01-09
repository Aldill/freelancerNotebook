import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent{
  user: RegisterData;
  w = window.innerWidth;
  disableClose: boolean;
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

    this.user = {} as RegisterData;
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }

  }

  registerUser(): void {
    this.usersService.postUser(this.user).subscribe((data) => {
      if (data.status === 'success') {
        this.router.navigate(['/']);
      }
    });
  }


  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
