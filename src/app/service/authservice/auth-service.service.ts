import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private logoutTimer: any;

  constructor(private http: HttpClient) { }

  login(data: any): any {
    return this.http.post("https://shortlyurl-6uvv.onrender.com/v1/public/auth/login", data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  signup(data: any): any {
    return this.http.post("https://shortlyurl-6uvv.onrender.com/v1/public/auth/signup", data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  setSession(token: string, expiresIn: number): void {
    const expiryTime = new Date().getTime() + expiresIn * 1000; // expiry in ms
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expiryTime.toString());

    // clear previous timer
    if (this.logoutTimer) clearTimeout(this.logoutTimer);

    // set automatic logout
    const timeout = expiryTime - new Date().getTime();
    this.logoutTimer = setTimeout(() => this.logout(), timeout);
  }



  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    window.location.href = "/login"; // redirect to login
  }

  checkSession(): void {
  if (typeof window === 'undefined') return; // skip on SSR

  const expiry = localStorage.getItem("expiry");
  if (expiry) {
    const timeout = +expiry - new Date().getTime();
    if (timeout <= 0) {
      this.logout();
    } else {
      setTimeout(() => this.logout(), timeout);
    }
  }
}

getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("token");
}

isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  const expiry = localStorage.getItem("expiry");
  if (!expiry) return false;

  const isValid = new Date().getTime() < +expiry;
  if (!isValid) this.logout();
  return isValid;
}

}
