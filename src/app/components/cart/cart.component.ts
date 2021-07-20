import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Classes/Cart';
import { Game } from 'src/app/Classes/Game';
import { User } from 'src/app/Classes/User';
import { CartService } from 'src/app/services/cart.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  games?: Cart[];
  user: User = null;
  cart: Cart = {
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
  total: number;

  constructor(private cs: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
    this.getGames();
    this.getTotal();
  }

  getUser() {
    this.user = JSON.parse(document.cookie);
  }

  getGames() {
    this.total = 0;
    this.cs.getGames(this.user.id).subscribe((games) => {
      this.games = games;
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        this.total += game.gameId.price;
      }
    });
  }

  getTotal() {
    console.log(this.games);
  }

  purchase() {
    this.cs.purchase(this.user.id).subscribe();
    this.router.navigate(['catalog']);
  }

  goBack() {
    this.router.navigate(['catalog']);
  }

  removeCart(game: Game) {
    this.cart.userId = this.user;
    this.cart.gameId = game;
    console.log(this.cart);
    this.cs
      .addGame(this.user, game, 'remove')
      .subscribe((cart) => (this.cart = cart));
    setTimeout(() => {
      this.cs.getGames(this.user.id).subscribe((games) => (this.games = games));
    }, 3000);
  }
}
