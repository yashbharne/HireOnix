import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.api.post('auth/login', credentials);
  }
}
