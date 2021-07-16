import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Classes/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  addUser(user: object) {
    console.log('hit');
    this.http
      .post<User>(
        'http://ec2-3-133-159-173.us-east-2.compute.amazonaws.com:8080/VGDS/users',
        user
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['login']);
        },
        (error) => {
          alert('That Username is already in User');
          console.log(error);
        }
      );
  }
}
