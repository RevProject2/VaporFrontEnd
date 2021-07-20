import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.form.group({
    username: '',
    password: '',
  });
  user: User = null;
  //d-flex-row align-items-center bg-dark text-white
  constructor(
    private router: Router,
    private form: FormBuilder,
    private us: UserService
  ) {}

  ngOnInit() {}

  register() {
    this.router.navigate(['register']);
  }

  employeeLogin() {
    this.router.navigate(['employeeLogin']);
  }

  login() {
    this.us.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
