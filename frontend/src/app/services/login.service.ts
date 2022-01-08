import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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

        map(({ data }) => data as string),
        catchError((errorResponse) => {
          const handledError = errorResponse.error;
          this.snackBar.open(handledError.error, 'close');
          return throwError(errorResponse);
        })
      );
  }

  logout(): void {
    this.userToken = '';
    this.cookieService.delete('token');
    this.router.navigate(['/']);
  }
}
