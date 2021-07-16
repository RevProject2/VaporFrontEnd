import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  errorMessage = '';
  constructor(private router: Router, private http: HttpClient) {}

  async authenticate(username: string, password: string) {
    try {
      const result = await this.http
        .post<any>(
          // 'http://localhost:8080/users/login',
          'http://ec2-18-191-137-119.us-east-2.compute.amazonaws.com:8081/users/login',
          {
            username,
            password,
            withCredentials: true,
          }
        )
        .toPromise();
      sessionStorage.setItem('user', JSON.stringify(result));
      this.router.navigate(['user']);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('user');
    console.log(user);
    return user;
  }

  logOut() {
    sessionStorage.removeItem('username');
  }

  async getUser() {
    try {
      const result = await this.http
        .get<any>(
          'http://ec2-18-191-137-119.us-east-2.compute.amazonaws.com:8081/users/account',
          // 'http://localhost:8080/users/account',
          {
            withCredentials: true,
          }
        )
        .toPromise();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
