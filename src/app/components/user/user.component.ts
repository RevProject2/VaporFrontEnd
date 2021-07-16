import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  //user = sessionStorage.getItem('user');
  user = '';
  // newUser = JSON.parse(this.user);
  constructor(private loginService: AuthenticationService) {}

  ngOnInit(): void {
    //this.loginService.isUserLoggedIn();
    //console.log(this.user);
    this.loginService.getUser();
  }
}
