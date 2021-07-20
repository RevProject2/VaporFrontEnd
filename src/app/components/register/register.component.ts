import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.form.group({
    username: '',
    password: '',
    first: '',
    last: '',
    balance: 0,
  });

  constructor(
    private form: FormBuilder,
    private us: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['login']);
  }

  register() {
    this.us.addUser(this.registerForm.value);
  }
}
