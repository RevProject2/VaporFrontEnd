import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/User';

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

  private error = 'The username or password is not correct';
  user: User = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private form: FormBuilder
  ) {}

  ngOnInit() {}

  register() {
    this.router.navigate(['register']);
  }

  login(): void {
    console.log('hit');
    this.http
      .post<any>(
        'http://ec2-3-133-159-173.us-east-2.compute.amazonaws.com:8080/VGDS/users/login',
        this.loginForm.value
      )
      .subscribe(
        (response) => {
          console.log(response);
          let resString = JSON.stringify(response);

          document.cookie = resString;
          console.log(document.cookie);
          this.router.navigate(['user']);
        },
        (error) => {
          alert(this.error);
          console.log(error);
        }
      );
  }
  getCookie(cookieKey): string {
    let name = cookieKey + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
