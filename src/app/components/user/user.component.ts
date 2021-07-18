import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = null;
  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.user = JSON.parse(document.cookie);
  }
}
