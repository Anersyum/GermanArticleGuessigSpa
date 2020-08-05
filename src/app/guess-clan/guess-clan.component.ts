import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guess-clan',
  templateUrl: './guess-clan.component.html',
  styleUrls: ['./guess-clan.component.css']
})
export class GuessClanComponent implements OnInit {

  startGame = false;
  fadeOut = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  startGuessingGame() {

    this.fadeOut = true;

    setTimeout(() => {
      this.startGame = true;
    }, 1000);
  }

  guess(article: string) {

    alert(article);
  }

}
