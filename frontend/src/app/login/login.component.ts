import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

interface LoginDTO {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  w = window.innerWidth;
  disableClose: boolean;

  user: LoginDTO;
  constructor(private loginService: LoginService) {
    this.user = {} as LoginDTO;
    if (this.w > 450) {
      this.disableClose = true;
    } else {
      this.disableClose = false;
    }
  }

  loginUser(): void {
    this.loginService
      .loginUser(this.user)
      .subscribe((data) => console.log(data));
  }
  ngOnInit(): void {}
}
