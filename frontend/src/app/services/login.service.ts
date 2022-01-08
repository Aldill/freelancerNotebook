import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StaticResponse } from '../models/StaticResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private serviceEndpoint = 'http://localhost:5118/api/auth';
  userToken: string;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.userToken = cookieService.get('token') ?? '';
  }

  loginUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<string> {
    return this.httpClient
      .post<StaticResponse<string>>(this.serviceEndpoint, {
        username,
        password,
      })
      .pipe(
        tap(({ data }) => {
          this.userToken = data as string;
          this.cookieService.set(
            'token',

            this.userToken
          );
          this.router.navigate(['/home']);
        }),
        map(({ data }) => data as string)
      );
  }

  logout(): void {
    this.userToken = '';
    this.cookieService.delete('token');
    this.router.navigate(['/']);
  }
}
