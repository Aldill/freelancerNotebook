import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: RegisterData;
  w = window.innerWidth;
  disableClose: boolean;
  constructor(private usersService: UsersService, private router: Router) {
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
  ngOnInit(): void {}
}
