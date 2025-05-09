import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  gettoken() {
    const token = localStorage.getItem('access-token');
    if (!token) {
      return null;
    }
    return token;
  }

  removeToken() {
    localStorage.removeItem('access-token');
  }
}
