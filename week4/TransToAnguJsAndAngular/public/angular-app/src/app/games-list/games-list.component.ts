import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  @ViewChild('gameForm')
  gameForm!: NgForm;
  offset: number = 0
  game!: Game

games: Game[] = []

  constructor(private gamesDataService:GamesDataService) { }

  ngOnInit(): void {
    this.gamesDataService.getGames(this.offset).then((response) => {
      this.games = response
      console.log(" the out put response gamen is from front controller is ", response);
      
      const gameObject = JSON.parse(JSON.stringify(this.games))
      if (gameObject.length < 5) {
        this.offset = 0
      } else {
        this.offset = 5
      }
    })

}
onAddGame() {
  console.log(this.gameForm.value);

  this.gamesDataService.addGame(this.gameForm.value).then(response => this.game = response)

}
onPrevious() {
  this.offset -= 5
  if (this.offset <= 0) {
    this.offset = 0
  }
  this.gamesDataService.getGames(this.offset).then((response) => {
    this.games = response

  })

}
onNext() {

  this.gamesDataService.getGames(this.offset).then(response => {
    this.games = response
    const gameObject = JSON.parse(JSON.stringify(this.games))
    if (gameObject.length < 5) {
      this.offset = 0
    } else {
      this.offset += 5
    }
  })

}

delete(gameId: string) {
  this.gamesDataService.deleteGame(gameId).then(response => {
    
      if (this.offset - 5 >= 0) {
        this.offset -= 5
      }
      this.gamesDataService.getGames(this.offset).then((response) => {
        this.games = response
        console.log(" the out put response gamen is from front controller is ", response);
        
        const gameObject = JSON.parse(JSON.stringify(this.games))
        if (gameObject.length < 5) {
          this.offset = 0
        } else {
          this.offset = 5
        }
      })
    
  })

}

onClear() {
  this.gameForm.resetForm()
}

}

export class Game {
 
  _id !: string
  title !: string
  year!: number
  price !: number
  minPlayers !: number
  maxPlayers !: number
  rate!: number
}

//module.exports= Game;
