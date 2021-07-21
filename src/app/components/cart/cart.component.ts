import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Classes/Cart';
import { Game } from 'src/app/Classes/Game';
import { User } from 'src/app/Classes/User';
import { CartService } from 'src/app/services/cart.service';

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
  }

  getUser() {
    this.user = JSON.parse(document.cookie);
  }

  getGames() {
    this.total = 0;
    this.cs.getCart(this.user.id).subscribe((games) => {
      this.games = games;
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        this.total += game.gameId.price;
      }
    });
  }

  purchase() {
    this.cs.purchase(this.user.id);
    this.router.navigate(['catalog']);
  }

  goBack() {
    this.router.navigate(['catalog']);
  }

  removeCart(game: Game) {
    this.cart.userId = this.user;
    this.cart.gameId = game;
    this.cs
      .addGame(this.user, game, 'remove')
      .subscribe((cart) => (this.cart = cart));
    setTimeout(() => {
      this.cs.getCart(this.user.id).subscribe((games) => (this.games = games));
    }, 200);
  }
}
