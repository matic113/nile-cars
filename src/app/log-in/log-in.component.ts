import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (response) => { 
          console.log('Login successful! Response:', response);
          this.router.navigate(['/dashboard']);
          window.location.reload()
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed: ' + (err.error?.message || 'Invalid credentials'));
        }
      });
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
  }
