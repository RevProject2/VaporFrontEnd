import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-catalog-edit',
  templateUrl: './catalog-edit.component.html',
  styleUrls: ['./catalog-edit.component.css']
})
export class CatalogEditComponent implements OnInit {


  games?: Game[];
  selectedGame?: Game;
  @Input() game?: Game;
  isGameAdd: boolean = false;

  
  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }
  onSelect(game: Game): void{
    console.log(`clicked: ${JSON.stringify(game)}`)
    this.selectedGame = game;
  }

  clickAdd(){
    this.isGameAdd = !this.isGameAdd;
  }


  addGame(game:Game):void{
    game.name= game.name.trim();
    game.genre=game.genre.trim();
    game.img= game.img.trim();
    console.log(`add game: ${game.name}, ${game.genre}, ${game.img}, ${game.price}`);
    if(!game){return;}
    this.gameService.addGame(game).subscribe(game =>{this.games.push(game);this.getGames()});
    this.getGames();
  }


  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  delete(game: Game): void {
    this.games = this.games.filter(g => g !== game);
    this.gameService.deleteGame(game.id).subscribe();
  }

  save(game:Game): void{
  
    game.name= game.name.trim();
    game.genre=game.genre.trim();
    game.img= game.img.trim();

    if(game){
      this.gameService.updateGame(game).subscribe(
        ()=>{
         
          this.goBack();
          this.getGames();
        }
        );
    }
  }

  goBack(): void{
    this.selectedGame= null;
  }

  collapse(): void{
    this.isGameAdd = !this.isGameAdd;
  }

  // clearGames(): void {
  //   this.games = [];
  // }
}
