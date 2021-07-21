import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Classes/Cart';
import { Game } from 'src/app/Classes/Game';
import { Library } from 'src/app/Classes/Library';
import { User } from 'src/app/Classes/User';
import { CartService } from 'src/app/services/cart.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  games?: Game[];
  cartGames: Cart[];
  userGames?: Library[];
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

  gameId: number[];
  cartGameId: number[];

  constructor(
    private gameService: GameService,
    private router: Router,
    private cs: CartService
  ) {}

  ngOnInit(): void {
    this.getGames();
    this.getUser();
    this.getUserGames();
    this.getCartGames();
  }

  getUser() {
    this.user = JSON.parse(document.cookie);
  }

  getGames(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  getUserGames() {
    this.gameId = [];
    this.gameService.getUserGames(this.user.id).subscribe((userGames) => {
      this.userGames = userGames;
      for (let i = 0; i < this.userGames.length; i++) {
        let game = this.userGames[i];
        this.gameId.push(game.gameId.id);
      }
    });
  }

  getCartGames() {
    this.cartGameId = [];
    this.cs.getCart(this.user.id).subscribe((cartGames) => {
      this.cartGames = cartGames;
      for (let i = 0; i < this.cartGames.length; i++) {
        let game = this.cartGames[i];
        this.cartGameId.push(game.gameId.id);
      }
    });
  }

  isValid(game) {
    for (let i = 0; i < this.cartGameId.length; i++) {
      if (game.id == this.cartGameId[i]) {
        return true;
      }
    }
    for (let i = 0; i < this.gameId.length; i++) {
      if (game.id == this.gameId[i]) {
        return true;
      }
    }
    return false;
  }

  clearGames(): void {
    this.games = [];
  }

  createCart(game: Game) {
    this.cart.userId = this.user;
    this.cart.gameId = game;
    this.cs
      .addGame(this.user, game, 'add')
      .subscribe((cart) => (this.cart = cart));
  }

  viewCart() {
    this.router.navigate(['cart']);
  }
}
