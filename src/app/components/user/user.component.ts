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
  games: Game[];
  userGames: Library[];
  balanceForm = this.form.group({
    balance: '',
  });

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
  }
  getUser() {
    this.user = JSON.parse(document.cookie);
  }

  addMoney() {
    console.log(this.balanceForm.value);
    this.us.updateBalance(this.user.id, this.balanceForm.value.balance);
    document.cookie = 'cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    this.us.getUser(this.user.id);
    this.user = JSON.parse(document.cookie);
  }

  getUserGames() {
    this.user = JSON.parse(document.cookie);
    console.log(this.user);
    this.gs
      .getUserGames(this.user.id)
      .subscribe((games) => ((this.userGames = games), console.log(games)));
  }
}
