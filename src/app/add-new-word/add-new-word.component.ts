import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-word',
  templateUrl: './add-new-word.component.html',
  styleUrls: ['./add-new-word.component.css']
})
export class AddNewWordComponent implements OnInit {

  wordModel: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {

    this.http.post('http://localhost:5000/api/words/create', this.wordModel).subscribe(
      (response: any) => {

        alert('Successfully added!');
        console.log(response);
      }, error => {

        console.error(error);
      });
  }
}
