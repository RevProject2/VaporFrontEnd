import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  invalidLogin = false;

  constructor(
    private router: Router,
    private loginservice: AuthenticationService
  ) {}

  ngOnInit() {}

  login() {
    if (this.loginservice.authenticate(this.username, this.password)) {
      this.router.navigate(['user']);
      this.invalidLogin = false;
    } else this.invalidLogin = true;
  }
}
