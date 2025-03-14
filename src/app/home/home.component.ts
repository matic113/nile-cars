import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, CommonModule, MatGridListModule, MatCardModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoading = false; // Controls loading state
  gridCols: number = 4;

  constructor() {
    // Update grid columns based on screen size
    this.updateGridCols();

  }

  ngOnInit() {
    this.getCarsList(1);
  }

<<<<<<< HEAD
  // Update grid columns based on screen size
=======
  //------------------------------------------------------ Update grid columns based on screen size------------------------------------------------------
>>>>>>> upstream/main
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateGridCols();
  }

  updateGridCols() {
    const width = window.innerWidth;
    if (width < 600) {
      this.gridCols = 1; // Mobile
    } else if (width < 1050) {
      this.gridCols = 2; // Tablet
    } else if (width < 1300) {
      this.gridCols = 3; // Small laptop
    } else {
      this.gridCols = 4; // Desktop
    }
  }
<<<<<<< HEAD

  // Get Cars Service
  carsList: any = [];
  totalPages: number = 1;
=======
  //------------------------------------------------------End Update grid columns based on screen size------------------------------------------------------


  //------------------------------------------------------ Get Cars Service start------------------------------------------------------
  // TODO: add another list for enchance pagination first to display and secound to store data
  carsList: any = []
>>>>>>> upstream/main

  totalPages: number = 1;
  pages: number[] = [];
  async getCarsList(pageNum: number) {
    this.isLoading = true;
    const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?page=${pageNum}`);
    const data = await response.json();
    this.isLoading = false;
    this.carsList = data.items;
    this.totalPages = data.pageCount;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
<<<<<<< HEAD
=======
  //------------------------------------------------------ Get Cars Service end------------------------------------------------------
>>>>>>> upstream/main

  //------------------------------------------------------ Pagination logic------------------------------------------------------
  currentPage = 1;


  previousPage() {
    console.log(this.totalPages);
    if (this.currentPage > 1) {
      this.currentPage--;
      this.carsList = [];
      this.getCarsList(this.currentPage);
    }
  }

  setPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.carsList = [];
      this.getCarsList(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.carsList = [];
      this.getCarsList(this.currentPage);
    }
  }
  //------------------------------------------------------ Pagination logic end------------------------------------------------------

  // Filter Logic
  filter: any = {
    maker: '',
    model: '',
    hourPrice: '',
    location: '',
    transmissionType: '',
    brand: [],
    type: [],
    fuelType: [], // New filter for fuel type
    rating: [],
    price: 1000 // Default max price
  };

  updateFilter(key: string, value: string) {
    const index = this.filter[key].indexOf(value);
    if (index === -1) {
      this.filter[key].push(value); // Add filter value
    } else {
      this.filter[key].splice(index, 1); // Remove filter value
    }
  }

  updatePriceFilter() {
    // Trigger filter update when price changes
    this.filterCars();
  }

  async filterCars() {
    const queryParams = new URLSearchParams();
    for (const key in this.filter) {
      if (Array.isArray(this.filter[key])) {
        if (this.filter[key].length > 0) {
          queryParams.set(key, this.filter[key].join(','));
        }
      } else if (this.filter[key]) {
        queryParams.set(key, this.filter[key]);
      }
    }
    console.log(`https://nile-cars.azurewebsites.net/api/Cars?${queryParams}`);
    // const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?${queryParams}`);
    // const data = await response.json();
  }

  clearFilters() {
    this.filter = {
      maker: '',
      model: '',
      hourPrice: '',
      location: '',
      transmissionType: '',
      brand: [],
      type: [],
      fuelType: [], // Reset fuel type
      rating: [],
      price: 1000
    };
    this.filterCars(); // Refresh the list
  }
}