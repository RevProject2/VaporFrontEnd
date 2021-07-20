import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { Game } from '../Classes/Game';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../Classes/User';
import { Library } from '../Classes/Library';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gamesUrl =
    'http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/games';

  user: User = null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http
      .get<Game[]>(this.gamesUrl)
      .pipe(catchError(this.handleError<Game[]>('getGames', [])));
  }

  getUserGames(id: number): Observable<Library[]> {
    return this.http
      .get<Library[]>(
        `http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/users/libraries/${id}`
      )
      .pipe(catchError(this.handleError<Library[]>('getUserGames', [])));
  }

  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      return of([]);
    }
    const game = { name: term };
    console.log(`input game: ${game}, input json: ${JSON.stringify(game)}`);
    return this.http
      .post<Game[]>(
        `${this.gamesUrl}/search`,
        JSON.stringify(game),
        this.httpOptions
      )
      .pipe(
        tap((x) =>
          x.length
            ? console.log(`found game matching ${term}`)
            : console.log(`no game matching ${term}`)
        ),
        catchError(this.handleError<Game[]>('searchGames', []))
      );
  }

  addGame(game: Game): Observable<Game> {
    const jsGame = {
      name: game.name,
      price: game.price,
      genre: { name: game.genre },
      img: game.img,
    };
    console.log(`gsGame: ${JSON.stringify(jsGame)}`);
    return this.http
      .post<Game>(this.gamesUrl, JSON.stringify(jsGame), this.httpOptions)
      .pipe(
        // tap(
        //   // (newGame: Game) => console.log(added game id=${newGame.id}),
        //   catchError(this.handleError<Game>('addGame'))
        // )
        catchError(this.handleError<Game>('addGame'))
      );
  }

  updateGame(game: Game): Observable<any> {
    const jsGame = {
      id: game.id,
      name: game.name,
      price: game.price,
      genre: { name: game.genre },
      img: game.img,
    };
    console.log(`gsGame: ${JSON.stringify(jsGame)}`);
    return this.http
      .put<Game>(this.gamesUrl, JSON.stringify(jsGame), this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateGame')));
  }

  deleteGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted game id=${id}`)),
      catchError(this.handleError<Game>('deleteGame'))
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
