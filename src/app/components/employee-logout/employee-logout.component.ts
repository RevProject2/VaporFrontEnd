import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-logout',
  templateUrl: './employee-logout.component.html',
  styleUrls: ['./employee-logout.component.css'],
})
export class EmployeeLogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    console.log('hit');
    document.cookie = 'cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    this.router.navigate(['employeeLogin']);
  }
}
