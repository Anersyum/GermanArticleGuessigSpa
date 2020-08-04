import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessClanComponent } from './guess-clan/guess-clan.component';
import { AddNewWordComponent } from './add-new-word/add-new-word.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GuessingArticleGameComponent } from './guessing-article-game/guessing-article-game.component';

@NgModule({
   declarations: [
      AppComponent,
      GuessClanComponent,
      AddNewWordComponent,
      NavComponent,
      HomeComponent,
      GuessingArticleGameComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
