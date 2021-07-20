import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { Game } from '../Classes/Game';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../Classes/User';
import { GameService } from './game.service';
import { Cart } from '../Classes/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private gs: GameService) {}

  addGame(user: User, game: Game, s: string) {
    const cart = {
      userId: {
        id: user.id,
      },
      gameId: {
        id: game.id,
      },
    };
    return this.http
      .post<Cart>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/carts/${s}`,
        //'http://localhost:8080/carts/add',
        cart
      )
      .pipe(catchError(this.gs.handleError<Cart>('addGame')));
  }

  getGames(id: number) {
    return this.http
      .get<Cart[]>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/carts/${id}`
      )
      .pipe(catchError(this.gs.handleError<Cart[]>('getUserGames', [])));
  }

  removeGame(user: User, game: Game) {
    const cart = {
      userId: {
        id: user.id,
      },
      gameId: {
        id: game.id,
      },
    };
    return this.http
      .post<Cart>(
        'http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/carts/remove',
        //'http://localhost:8080/carts/add',
        cart
      )
      .pipe(catchError(this.gs.handleError<Cart>('removeGame')));
  }

  purchase(id: number) {
    return this.http
      .post(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/purchase/${id}`,
        null
      )
      .pipe(catchError(this.gs.handleError('purchase')));
  }
}
