import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee = null;
  constructor() {}

  ngOnInit(): void {
    this.getEmployee();
  }
  getEmployee() {
    this.employee = JSON.parse(document.cookie);
  }
}
