import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink,CommonModule],
  standalone:true
})
export class LoginComponent implements OnInit {
  isRegisterForm:boolean = false;
ngIf: any;
  toggleForm(){
    this.isRegisterForm = !this.isRegisterForm;
  }

  constructor() { }

  ngOnInit() {
  }

}
