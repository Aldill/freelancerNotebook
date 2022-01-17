import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { StaticResponse } from '../models/StaticResponse';
import { User } from '../models/User';
import { UserDetailsDTO } from '../models/UserDetailsDTO';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private serviceEndpoint = 'http://localhost:5118/api/users';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  getUserData(): Observable<User> {
    return this.httpClient
      .get<StaticResponse<User>>(this.serviceEndpoint)
      .pipe(map((response) => response.data as User));
  }

  getUserDetails(): Observable<StaticResponse<UserDetailsDTO>> {
    return this.httpClient.get<StaticResponse<UserDetailsDTO>>(
      `${this.serviceEndpoint}/details`
    );
  }

  updateUserData(id: string, user: User): Observable<boolean> {
    return this.httpClient.put(`${this.serviceEndpoint}/${id}`, user).pipe(
      mapTo(true),
      catchError((errorResponse) => {
        const handledError = errorResponse.error;
        this.snackBar.open(handledError.error, 'close');
        return throwError(errorResponse);
      })
    );
  }

  updateUserPassword(passwords: {
    old: string;
    new: string;
  }): Observable<boolean> {
    return this.httpClient
      .patch(`${this.serviceEndpoint}/password`, passwords)
      .pipe(
        mapTo(true),
        catchError((errorResponse) => {
          const handledError = errorResponse.error;
          this.snackBar.open(handledError.error, 'close');
          return throwError(errorResponse);
        })
      );
  }

  postUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Observable<StaticResponse<User>> {
    return this.httpClient
      .post<any>(this.serviceEndpoint, {
        username,
        mail: email,
        password,
        isAdmin: true,
        createdAt: new Date(),
      })
      .pipe(
        catchError((errorResponse) => {
          const handledError = errorResponse.error;
          this.snackBar.open(handledError.error, 'close');
          return throwError(errorResponse);
        })
      );
  }
}
