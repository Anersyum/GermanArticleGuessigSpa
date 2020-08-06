import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  showNextWord = false;
  isCorrect = false;
  modalButton: any;
  gameExited = false;
  incorrectWords = [];
  // tslint:disable-next-line: no-output-native
  @Output() load = new EventEmitter<boolean>(true);

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.modalButton = document.querySelector('#openModal');
    this.getWordsList();
  }

  guess(article: string) {

    if (this.wordsList[this.wordFromListPosition].article === article) {

      this.isCorrect = true;
      this.wordsGuessed++;
    } else {

      this.isCorrect = false;
      this.wordsFailed++;

      this.incorrectWords.push({
        guessedArticle: article,
        correctArticle: this.wordsList[this.wordFromListPosition].article,
        word: this.wordsList[this.wordFromListPosition].word
      });
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
    this.load.emit(true);

    this.http.get('http://localhost:5000/api/words/get/guessing').subscribe((response: any) => {

      this.wordsList = response.wordList;
      this.load.emit(false);
      this.listLoaded = true;
    }, error => {

      alertify.error('There was an error while getting the word list');
      this.load.emit(false);
      console.error(error);
    });
  }

  closeGame() {

    this.router.navigateByUrl('/');
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
      setTimeout(() => {
        this.gameExited = true;
      }, 500);
    });
  }

  private changeWord() {

    this.showNextWord = true;

    setTimeout(() => {
      this.article = '___';
      this.showAnswer = false;

      setTimeout(() => {
        this.showNextWord = false;
      }, 1000);

      this.wordFromListPosition++;
    }, 1000);
  }

  private continueGame() {

    this.showNextWord = false;
    this.showAnswer = false;
    this.article = '___';
    this.wordFromListPosition = 0;
    this.getWordsList();
  }
}
