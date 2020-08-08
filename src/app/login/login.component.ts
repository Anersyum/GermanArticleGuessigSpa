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
  isLoading = false;
  showErrorMessage = false;
  errorMessage = 'There has been a problem contacting the servers. Try again later.';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.isLoading = true;
    this.authService.login(this.loginModel).subscribe((response: any) => {

      this.isLoading = false;
      this.router.navigateByUrl('/');
    }, (error: any) => {

      if (error.status === 401) {

        this.errorMessage = 'Wrong password.';
      }

      this.showErrorMessage = true;
      this.isLoading = false;

      console.error(error);
    });
  }

  closeLoginForm() {

    this.router.navigateByUrl('/');
  }
}