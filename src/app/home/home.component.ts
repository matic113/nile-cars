import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, CommonModule, MatGridListModule, MatCardModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoading = true; // Controls loading state
  gridCols: number = 4;

  constructor() {
    // Update grid columns based on screen size
    this.updateGridCols();

    // Simulate data loading for 3 seconds
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }


  // Update grid columns based on screen size
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateGridCols();
  }

  updateGridCols() {
    const width = window.innerWidth;
    if (width < 600) {
      this.gridCols = 1; // موبايل
    } else if (width < 1050) {
      this.gridCols = 2; // تابلت
    } else if (width < 1300) {
      this.gridCols = 3; // لابتوب صغير
    } else {
      this.gridCols = 4; // ديسكتوب
    }
  }
  // End Update grid columns based on screen size



}
