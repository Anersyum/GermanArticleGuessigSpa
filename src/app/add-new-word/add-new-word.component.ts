import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as alertify from 'alertifyjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-word',
  templateUrl: './add-new-word.component.html',
  styleUrls: ['./add-new-word.component.css']
})
export class AddNewWordComponent implements OnInit {

  wordModel: any = {};
  savingWord = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {

    this.savingWord = true;

    this.http.post(environment.apiUrl + 'words/create', this.wordModel).subscribe(
      (response: any) => {

        alertify.success('The word ' + this.wordModel.word + ' has been added!');
        this.savingWord = false;
      }, error => {

        alertify.error('There was an error. Maybe you added a word that already exists?');
        this.savingWord = false;
        console.error(error);
      });
  }
}
