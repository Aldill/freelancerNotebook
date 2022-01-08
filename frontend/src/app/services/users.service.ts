import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticResponse } from '../models/StaticResponse';

interface User {
  id: string;
  createdAt: string;
  mail: string;
  password: string;
  username: string;
}
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
  }): Observable<StaticResponse<User>> {
    return this.httpClient.post<any>(this.serviceEndpoint, {
      username,
      mail: email,
      password,
      isAdmin: true,
      createdAt: new Date(),
    });
  }
}
