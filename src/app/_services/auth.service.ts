import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(loginModel: any) {

    return this.http.post(environment.apiUrl + 'auth/login', loginModel).pipe(
      map((response: any) => {

        const admin = response;

        if (admin) {

          localStorage.removeItem('token');
          localStorage.setItem('token', admin.token);
        }
      })
    );
  }

  isLoggedIn() {

    const token = localStorage.getItem('token');

    return !this.jwtHelperService.isTokenExpired(token);
  }

  logout() {

    localStorage.removeItem('token');
  }
}

