import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private serviceEndpoint = 'http://localhost:5118/api/auth';
  userToken: string;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
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
      .post<{ token: string }>(this.serviceEndpoint, { username, password })
      .pipe(
        tap(({ data }: any) => {
          this.userToken = data[0];
          this.cookieService.set(
            'token',

            this.userToken
          );
        })
      );
  }
}
