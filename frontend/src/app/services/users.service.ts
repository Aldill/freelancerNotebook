import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private serviceEndpoint = 'http://localhost:5118/api/users';

  constructor(private httpClient: HttpClient) {}

  postUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.httpClient.post<any>(this.serviceEndpoint, {
      username,
      email,
      password,
      isAdmin: true,
    });
  }
}
