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
  wordCount = 0;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  showWordsList() {

    this.showList = true;

    this.http.get('http://localhost:5000/api/words/get').subscribe((response: any) => {

      this.wordList = response.wordsList;
	  this.wordCount = this.wordList.length;
    }, error => {

      alertify.error('There was an error');
      console.error(error);
    })
  }

  deleteWord(id: number, event) {

    this.http.post('http://localhost:5000/api/words/delete', { id }).subscribe((response: any) => {

      event.target.parentElement.remove();
      alertify.success('Deleted successfully!');
    }, error => {

      alertify.error('There was an errror while deleting the word.');
      console.error(error);
    })
  }
}
