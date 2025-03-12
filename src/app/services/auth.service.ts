import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://nile-cars.azurewebsites.net/api/auth/register';
  private loginUrl = 'https://nile-cars.azurewebsites.net/api/auth/token';    
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/dashboard']); 
        }
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/dashboard']); 
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  getFirstname(): string | null {
    const decoded = this.decodeToken();
    console.log("Decoded Token Data:", decoded); 
    return decoded ? decoded.FirstName || decoded.firstName : null;
  }


logout(): void {
  localStorage.removeItem('auth_token');
  this.router.navigate(['/login']);
}

}
