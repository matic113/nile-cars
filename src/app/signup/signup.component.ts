import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterLink],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  
  passwordsMatch(): boolean {
    return this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value;
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.passwordsMatch()) {
      alert('Please fix the errors before submitting.');
      return;
    }
  
    this.authService.onSignup(this.registerForm.value).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        console.log('Registration successful', response);
        alert('Registration success');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
  
}
