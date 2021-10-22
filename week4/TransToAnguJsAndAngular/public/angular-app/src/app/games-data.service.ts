import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';
  constructor(private httpClient: HttpClient) {}
  public getGames(offset:number): Promise<Game[]> {
    const url: string = this.apiBaseUrl + '/games';
    return this.httpClient
      .get(url)
      .toPromise()
      .then((response) => response as Game[])
      .catch(this.handleError);
  }

  public getGame(gameId: string): Promise<Game> {
    //const gameId: string = "5fbed15c07a5894b456a4336"
    const url: string = this.apiBaseUrl + '/games/' + gameId;
    return this.httpClient
      .get(url)
      .toPromise()
      .then((response) => response as Game)
      .catch(this.handleError);
  }

  public addGame(game: Game): Promise<Game> {
    console.log('adding Game');

    //const gameId: string = "5fbed15c07a5894b456a4336"
    const url: string = this.apiBaseUrl + '/games';
    return this.httpClient
      .post(url, game)
      .toPromise()
      .then((response) => response as Game)
      .catch(this.handleError);
  }
  public updateGame(gameId: string, game: Game): Promise<Game> {
    console.log('game added');
    const url: string = this.apiBaseUrl + '/games/' + gameId;
    return this.httpClient
      .put(url, game)
      .toPromise()
      .then((response) => response as Game)
      .catch(this.handleError);
  }
  public deleteGame(gameId: string): Promise<Game> {
    const url: string = this.apiBaseUrl + '/games/' + gameId;
    return this.httpClient
      .delete(url)
      .toPromise()
      .then((response) => {
        response as Game
        
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
