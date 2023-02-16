import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getToken(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  cleanToken(key: string) {
    localStorage.removeItem(key);
  }

  cleanAll() {
    localStorage.clear();
  }

  validateTokenExpiration(key: string): boolean {
    let exp: any;

    let isJwtExpired = false;
    try {
      const token = this.getToken(key);
      const jwt = this.getJwt(token);
      //console.log(jwt);
      exp = jwt_decode(jwt);
    } catch (e) {
      if (!exp) isJwtExpired = true;
    }
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > exp) isJwtExpired = true;

    return isJwtExpired;
  }

  getJwt(fullToken: string): string {
    const { token }: any = fullToken;
    return token.replace('Bearer ', '');
  }

  getUserRole(key: string): string {
    try {
      const token = this.getToken(key);
      const tempRole = this.getJwtRole(token);
      //console.log(tempRole);
      return tempRole;
    } catch (error) {}
    return '';
  }

  getJwtRole(fullToken: string): string {
    const { rol }: any = fullToken;
    return rol;
  }
}
