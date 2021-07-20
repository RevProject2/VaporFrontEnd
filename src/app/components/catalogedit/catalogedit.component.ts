import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/Classes/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-catalogedit',
  templateUrl: './catalogedit.component.html',
  styleUrls: ['./catalogedit.component.css'],
})
export class CatalogeditComponent implements OnInit {
  games?: Game[];
  selectedGame?: Game;
  @Input() game?: Game;
  isGameAdd: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGames();
  }
  onSelect(game: Game): void {
    console.log(`clicked: ${JSON.stringify(game)}`);
    this.selectedGame = game;
  }

  clickAdd() {
    this.isGameAdd = !this.isGameAdd;
  }

  addGame(game: Game): void {
    game.name = game.name.trim();
    game.genre = game.genre.trim();
    game.img = game.img.trim();
    console.log(
      `add game: ${game.name}, ${game.genre}, ${game.img}, ${game.price}`
    );
    if (!game) {
      return;
    }
    this.gameService.addGame(game).subscribe((game) => {
      this.games.push(game);
      this.getGames();
    });
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  delete(game: Game): void {
    this.games = this.games.filter((g) => g !== game);
    this.gameService.deleteGame(game.id).subscribe();
  }

  save(game: Game): void {
    game.name = game.name.trim();
    game.genre = game.genre.trim();
    game.img = game.img.trim();

    if (game) {
      this.gameService.updateGame(game).subscribe(() => {
        this.goBack();
        this.getGames();
      });
    }
  }

  goBack(): void {
    this.selectedGame = null;
  }

  collapse(): void {
    this.isGameAdd = !this.isGameAdd;
  }
}
