import { Component, OnInit } from '@angular/core';

import { Game} from '../games-list/games-list.component';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';
@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent implements OnInit {

  game!: Game
  constructor(private gamesDataService: GamesDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let gameId = this.route.snapshot.params.gameId
    console.log("gameId: ", gameId);
    
    this.gamesDataService.getGame(gameId).then(response => this.game = response)

    this.gamesDataService.getGame(gameId).then(function(response){
     // this.game = response;
      console.log(response);
      
    })
  }
  }


