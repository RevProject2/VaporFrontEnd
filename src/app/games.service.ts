import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , EMPTY} from 'rxjs';
import { Game } from './game';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gamesUrl = 'http://ec2-18-216-176-243.us-east-2.compute.amazonaws.com:8080/VGDS/games';
  // private searchUrl = 'http://ec2-3-133-159-173.us-east-2.compute.amazonaws.com:8080/VGDS/games/search';
    // URL to web api

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor( private http: HttpClient) { }
  addGame(game: Game): Observable<Game>{
    const jsGame = {
      name:game.name,
      price: game.price,
      genre:{name:game.genre},
      img:game.img
    }
    console.log(`gsGame: ${JSON.stringify(jsGame)}`)
    return this.http.post<Game>(this.gamesUrl,JSON.stringify(jsGame),this.httpOptions)
    .pipe(
      // tap(
      //   // (newGame: Game) => console.log(`added game id=${newGame.id}`),
      //   catchError(this.handleError<Game>('addGame'))
      // )
      catchError(this.handleError<Game>('addGame'))
    )
  
  }


  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
    .pipe(
      catchError(this.handleError<Game[]>('getGames', []))
    )
  }

  searchGames(term: string): Observable<Game[]>{
    if(!term.trim()){
      return of([]);
    }
    const game = {name:term};
    console.log(`input game: ${game}, input json: ${JSON.stringify(game)}`)
    return this.http.post<Game[]>(`${this.gamesUrl}/search` , JSON.stringify(game), this.httpOptions)
    .pipe(
      tap(x => x.length ?
       console.log(`found game matching ${term}`):
       console.log(`no game matching ${term}`)),
      catchError(this.handleError<Game[]>('searchGames',[]))
    );
  }

  updateGame(game: Game): Observable<any>{
    const jsGame = {
      id:game.id,
      name:game.name,
      price: game.price,
      genre:{name:game.genre},
      img:game.img
    }
    console.log(`gsGame: ${JSON.stringify(jsGame)}`)
    return this.http.put<Game>(this.gamesUrl, JSON.stringify(jsGame), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateGame'))
    )
  
  }

  deleteGame(id: number): Observable<Game>{
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, this.httpOptions).pipe(
      tap(_=>console.log(`deleted game id=${id}`)),
      catchError(this.handleError<Game>(`deleteGame`))
    );
  }

  private handleError<T>(operation='operation', result?: T){
    return (error: any): Observable<T> =>{
      return of(result as T);
    }
  }
  
}
