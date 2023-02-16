import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://189.234.123.27/APIGeros/';
//const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  apiLogin(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(
      AUTH_API + 'auth/login',
      {
        email: username,
        password: password,
      },
      httpOptions
    );
  }
}
