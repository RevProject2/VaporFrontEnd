import { Component, OnInit, Input } from '@angular/core';
import { Game} from '../game';
import { GamesService } from '../games.service';
import { CatelogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  @Input() game?: Game;
  constructor(private gameService: GamesService) { }

  catelog: CatelogComponent;

  ngOnInit(): void {
  
  }

  getGame(): void{

  }

  goBack(): void{
    this.game= null;
  }

  save(game:Game): void{
    let catelog:CatelogComponent = new CatelogComponent(this.gameService);
    game.name= game.name.trim();
    game.genre=game.genre.trim();
    game.img= game.img.trim();

    if(game){
      this.gameService.updateGame(game).subscribe(
        ()=>{
         
          this.goBack();
          catelog.getGames();
        }
        );
    }
  }

}
