import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://nile-cars.azurewebsites.net/api/auth/register';

  constructor(private http: HttpClient) { }
  onSignup(obj: any) {
    return this.http.post(`${this.apiUrl}`, obj)
  }

}
