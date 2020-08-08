import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeMessage = 'Welcome guest!';

  constructor(private authService: AuthService) { }

  ngOnInit() {

    if (this.authService.isLoggedIn()) {

      this.homeMessage = 'Welcome back Ines-san';
    }
  }

}
