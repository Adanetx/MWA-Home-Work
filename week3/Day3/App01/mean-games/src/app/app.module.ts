import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { GamesListComponent } from './games-list/games-list.component';
import {HttpClientModule} from '@angular/common/http';
import { GameOneComponent } from './game-one/game-one.component';
import { ErrorPageComponent } from './error-page/error-page.component'
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent,
    GameOneComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "games",
        component: GamesListComponent
      },
      {
        path: "games/:gameId",
        component: GameOneComponent
      }
      , {
        path: "**",
        component: ErrorPageComponent

      }
    ])
  ],

 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
