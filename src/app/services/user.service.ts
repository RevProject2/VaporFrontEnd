import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PurchaseHistory } from '../Classes/PurchaseHistory';
import { User } from '../Classes/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string) {
    this.http
      .post<any>(
        'http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/login',
        {
          username,
          password,
        }
      )
      .subscribe(
        (response) => {
          let resString = JSON.stringify(response);
          document.cookie = resString;
          this.router.navigate(['user']);
        },
        (error) => {
          alert('The Username or Password is not correct');
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

  addUser(user: object) {
    this.http
      .post<User>(
        'http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users',
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

  getUser(id: number) {
    return this.http
      .get<User>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/${id}`
      )
      .subscribe((response) => {
        let resString = JSON.stringify(response);
        document.cookie = resString;
      });
  }

  getUserBalance(id: number) {
    return this.http
      .get<User>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/${id}`
      )
      .pipe(catchError(this.handleError<User>('getUserBalance')));
  }

  updateBalance(id: number, balance: number) {
    const user = { balance: balance };
    return this.http
      .put<User>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/deposit/${id}`,
        user
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          alert('The balance cannot be a negative number');
          console.log(error);
        }
      );
  }

  getPurchaseHistory(id: number) {
    return this.http
      .get<PurchaseHistory[]>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/history/${id}`
      )
      .pipe(
        catchError(
          this.handleError<PurchaseHistory[]>('getPurchaseHistory', [])
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
