import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, MatIconModule, CommonModule, MatGridListModule, MatCardModule,],
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


  ngOnInit() {
    this.getCarsList(1);
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


  // Get Cars Service start
  carsList: any = []
  totalPages: number = 1;

  async getCarsList(pageNum: number) {
    const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?page=${pageNum}`);
    const data = await response.json();
    this.carsList = data.items;
    // Todo: change after
    // this.totalPages = data.totalCount
  }
  // Get Cars Service end


  currentPage = 1;
  pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  setPage(page: number) {
    this.currentPage = page;
    this.getCarsList(this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCarsList(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCarsList(this.currentPage);
    }
  }


}
