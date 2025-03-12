import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  login() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => { 
        console.log('Login successful! Response:', response);
    
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed: ' + (err.error?.message || 'Invalid credentials'));
      }
    });
  }
  }
