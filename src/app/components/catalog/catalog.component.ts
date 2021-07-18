import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/Classes/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  games?: Game[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }
  clearGames(): void {
    this.games = [];
  }
}
