import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel = {
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {

    console.log(this.loginModel.password);
    return;
    this.authService.login(this.loginModel).subscribe((response: any) => {

      this.router.navigateByUrl('/');
    }, error => {

        console.error(error);
    });
  }

  continueAsGuest() {

    this.authService.logInAsGuest();
  }
}