import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FunkoModel } from 'src/app/models/funko.model';
import { LocalStorageService } from 'src/app/services/api/local-storage.service';

const AUTH_API = 'http://189.234.123.27/APIGeros/';
//const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class FunkosService {
  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService
  ) {}

  getAllFunkosService(): Observable<any> {
    const { token } = this.storageService.getToken('User');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      }),
    };
    return this.httpClient.get(AUTH_API + 'funkos', httpOptions);
  }
}
