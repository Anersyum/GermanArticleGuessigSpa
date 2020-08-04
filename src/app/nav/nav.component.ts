import { Component, OnInit } from '@angular/core';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  wordList: any;
  showList = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  showWordsList() {

    this.showList = true;

    this.http.get('http://localhost:5000/api/words/get').subscribe((response: any) => {

      this.wordList = response.wordsList;
    }, error => {

      alertify.error('There was an error');
      console.error(error);
    })
  }
}
