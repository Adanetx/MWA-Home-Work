import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
export class Game {
  title: string;
  price:number;
  year: number
}
