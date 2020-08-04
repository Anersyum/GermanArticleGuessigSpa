import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guess-clan',
  templateUrl: './guess-clan.component.html',
  styleUrls: ['./guess-clan.component.css']
})
export class GuessClanComponent implements OnInit {

  startGame = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  startGuessingGame() {

    this.startGame = true;
  }

  guess(article: string) {

    alert(article);
  }

}
