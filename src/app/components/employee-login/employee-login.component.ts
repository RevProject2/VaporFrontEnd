import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css'],
})
export class EmployeeLoginComponent implements OnInit {
  loginForm = this.form.group({
    username: '',
    password: '',
  });

  private error = 'The username or password is not correct';
  employee: Employee = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private form: FormBuilder
  ) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['login']);
  }

  login(): void {
    this.http
      .post<any>(
        'http://ec2-3-133-159-173.us-east-2.compute.amazonaws.com:8080/VGDS/employees/login',
        this.loginForm.value
      )
      .subscribe(
        (response) => {
          let resString = JSON.stringify(response);
          document.cookie = resString;
          this.router.navigate(['employee']);
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
