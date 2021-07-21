import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Game } from 'src/app/Classes/Game';
import { Library } from 'src/app/Classes/Library';
import { User } from 'src/app/Classes/User';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public user: User;
  userBalance: User = {
    id: 0,
    username: '',
    password: '',
    first: '',
    last: '',
    balance: 0,
  };
  games: Game[];
  userGames: Library[];
  balanceForm = this.form.group({
    balance: '',
  });

  balance: number;

  library: Library = {
    id: 0,
    userId: {
      id: 0,
      username: '',
      password: '',
      first: '',
      last: '',
      balance: 0,
    },
    gameId: {
      name: '',
      id: 0,
      genre: '',
      price: 0,
      img: '',
    },
  };
  constructor(
    private gs: GameService,
    private us: UserService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserGames();
    this.getUser();
    this.getBalance();
  }
  getUser() {
    this.user = JSON.parse(document.cookie);
  }

  addMoney() {
    this.us.updateBalance(this.user.id, this.balanceForm.value.balance);
    setTimeout(() => {
      this.getBalance();
    }, 200);
  }

  getBalance() {
    this.us
      .getUserBalance(this.user.id)
      .subscribe((user) => (this.userBalance = user));
    this.balance = this.userBalance.balance;
  }

  getUserGames() {
    this.user = JSON.parse(document.cookie);
    this.gs
      .getUserGames(this.user.id)
      .subscribe((games) => (this.userGames = games));
  }
}
