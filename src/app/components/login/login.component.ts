import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private loginservice: AuthenticationService) {}

  ngOnInit() {}

  login() {
    this.loginservice.authenticate(this.username, this.password);
  }
}
