import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guessing-article-game',
  templateUrl: './guessing-article-game.component.html',
  styleUrls: ['./guessing-article-game.component.css']
})
export class GuessingArticleGameComponent implements OnInit {

  wordsList: any;
  wordsGuessed = 0;
  wordsFailed = 0;
  wordFromListPosition = 0;
  listLoaded = false;
  article = '___';
  showAnswer = false;
  // todo: add tooltips to nav buttons
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.getWordsList();
  }

  guess(article: string) {

    if (this.wordsList[this.wordFromListPosition].article === article) {

      alertify.success('You guessed right!');
      this.wordsGuessed++;
    } else {

      alertify.error('You guessed wrong!');
      this.wordsFailed++;
    }

    this.showAnswer = true;

    setTimeout(() => {
      this.article = this.wordsList[this.wordFromListPosition].article;
    }, 750);

    setTimeout(() => {

      if (this.isEndOfList()) {

        this.notifyScore();
      } else {

        this.changeWord();
      }
    }, 3 * 1000);
  }

  getWordsList() {

    this.listLoaded = false;

    this.http.get('http://localhost:5000/api/words/get/guessing').subscribe((response: any) => {

      this.wordsList = response.wordList;
      this.listLoaded = true;
    }, error => {

      alertify.error('There was an error while getting the word list');
      console.error(error);
    });
  }

  private isEndOfList() {

    if (this.wordFromListPosition >= (this.wordsList.length - 1)) {

      return true;
    }

    return false;
  }

  private notifyScore() {

    alertify.confirm('Your current score is ' + this.wordsGuessed + ' articles guessed correctly '
    + 'and ' + this.wordsFailed + ' articles guessed incorrectly. Do you want to continue?',
    () => {
      this.continueGame();
    }, () => {
      this.router.navigateByUrl('/');
    });
  }

  private changeWord() {

    this.article = '___';
    this.showAnswer = false;
    this.wordFromListPosition++;
  }

  private continueGame() {

    this.showAnswer = false;
    this.article = '___';
    this.wordFromListPosition = 0;
    this.getWordsList();
  }
}
