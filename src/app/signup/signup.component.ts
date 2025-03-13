import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {  Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { mismatch: true };
  };
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator });

 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.secondName,
        userName: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      this.authService.onSignup(formData).subscribe({
        next: (res) => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          
        },
        error: (err) => {
          console.error('Registration error:', err);
        }
      });
    }
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}