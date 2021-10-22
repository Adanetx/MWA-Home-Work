import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';

import {HttpClientModule} from '@angular/common/http'

import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameOneComponent } from './game-one/game-one.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterReactiveComponent } from './register-reactive/register-reactive.component';
import { RegisterTemplateComponent } from './register-template/register-template.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameOneComponent,
    FooterComponent,
    NavigationComponent,
    RegisterReactiveComponent,
    RegisterTemplateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
        path: "register",
        component: RegisterTemplateComponent
        //component: RegisterReactiveComponent
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
  //bootstrap: [WelcomeComponent] // new one
  bootstrap: [AppComponent] // old one
})
export class AppModule { }
