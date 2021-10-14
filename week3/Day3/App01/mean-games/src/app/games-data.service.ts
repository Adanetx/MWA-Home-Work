import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Game } from './games-list/games-list.component';
import { promises } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private httpClient: HttpClient) { }
  public getGames(): Promise<Game[]>{

    const url: string = this.apiBaseUrl + "/games"
    return this.httpClient.get(url).toPromise()
    .then(response => response as Game[])
    .catch(this.handleError)
  }
  public getGame(gameId:string): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/" + gameId
    return this.httpClient.get(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);


  }
  private handleError(error: any): Promise<any> {
    console.log("Something went wrong", error);
    return Promise.reject(error.message || error)

  }
}
