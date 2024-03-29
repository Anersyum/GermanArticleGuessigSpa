import { Component, OnInit } from '@angular/core';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  wordList: any;
  showList = false;
  wordCount = 0;
  lastEnteredWord = '';
  isLoading = false;
  menuOpened = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  showWordsList() {

    this.showList = true;
    this.isLoading = true;

    this.http.get(environment.apiUrl + 'words/get').subscribe((response: any) => {

      this.wordList = response.wordsList;

      if (this.wordList.length > 0) {

        this.lastEnteredWord = this.wordList[this.wordList.length - 1].article + ' ' + this.wordList[this.wordList.length - 1].word;
      }

      this.wordCount = this.wordList.length;
      this.isLoading = false;
    }, error => {

      alertify.error('There was an error');
      console.error(error);
      this.isLoading = false;
    });
  }

  deleteWord(id: number, event) {

    this.isLoading = true;

    this.http.post(environment.apiUrl + 'words/delete', { id }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).subscribe((response: any) => {

      event.target.parentElement.remove();
      alertify.success('Deleted successfully!');
      this.isLoading = false;
    }, error => {

      alertify.error('There was an errror while deleting the word.');
      console.error(error);
      this.isLoading = false;
    });
  }

  openMenu() {

    this.menuOpened = !this.menuOpened;
  }

  closeMenu() {

    this.menuOpened = false;
  }

  isLoggedIn(): boolean {

    return this.authService.isLoggedIn();
  }

  logout() {

    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
