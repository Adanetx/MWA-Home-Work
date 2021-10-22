import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../games-list/games-list.component'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent implements OnInit {
  @ViewChild('gameForm')
  updateFlag:boolean = false
  gameForm!:NgForm;
  game!:Game  

  constructor(private gamesDataService: GamesDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let gameId = this.route.snapshot.params.gameId
    console.log("gameId: ", gameId);
    
    this.gamesDataService.getGame(gameId).then(response => this.game = response)

    this.gamesDataService.getGame(gameId).then(function(response){
  
      console.log(response);
      
    })
  }



showForm(){
  console.log(this.updateFlag);
  
  this.updateFlag = true

  console.log(this.updateFlag);


}
onUpdateGame(){
  let gameId = this.route.snapshot.params.gameId

  console.log(this.gameForm.value);
  
  this.gamesDataService.updateGame(gameId, this.gameForm.value).then(response => {
    this.game = response
    this.gamesDataService.getGame(gameId).then(response => this.game = response)

  })

}

onClear(){
  this.gameForm.resetForm()
}

}
