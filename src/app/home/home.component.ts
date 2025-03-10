import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoading = true; // Controls loading state

  constructor() {
    // Simulate data loading for 3 seconds
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
