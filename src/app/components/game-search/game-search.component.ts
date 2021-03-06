import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Game } from 'src/app/Classes/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css'],
})
export class GameSearchComponent implements OnInit {
  games$!: Observable<Game[]>;
  private searchTerms = new Subject<string>();

  constructor(private gamesService: GameService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.games$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.gamesService.searchGames(term))
    );
  }
}
