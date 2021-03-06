import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';
import { StaticResponse } from '../models/StaticResponse';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private serviceEndpoint = 'http://localhost:5118/api/client';

  constructor(private httpClient: HttpClient) {}

  createClient({
    name,
    mail,
    phone,
  }: {
    name: string;
    mail: string;
    phone: string;
  }): Observable<string> {
    return this.httpClient
      .post<StaticResponse<Client>>(this.serviceEndpoint, { name, mail, phone })
      .pipe(map(({ data }) => (data as Client).id as string));
  }
}
