import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
// import { Games } from '../mock-games';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatelogComponent implements OnInit {
  // game: Game ={
  //   id:1,
  //   name:'Swords of Legends Online',
  //   genre: 'RPG',
  //   imageURL:'https://cdn.akamai.steamstatic.com/steam/apps/1418100/capsule_184x69.jpg?t=1625843277',
  //   price: 39.99

  // }

  games?: Game[];

  
  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }
  clearGames(): void {
    this.games = [];
  }
}
