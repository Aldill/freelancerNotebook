import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  w = window.innerWidth;
  disableClose:boolean;
  constructor() { 
    if (this.w > 450) {
      this.disableClose=true;
    } else {
      this.disableClose=false;
    }

  }


  ngOnInit(): void {
  }

}
