import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// Define an interface for the car data
interface Car {
  maker: string;
  model: string;
  rating: number;
  reviewsCount: number;
  numberOfPassengers?: number;
  transmissionType?: string;
  hourPrice: number;
  isBooked?: boolean;
  [key: string]: any; // Allow additional properties for flexibility
}

@Component({
  selector: 'app-search',
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  isLoading = true;
  gridCols: number = 4;
  carsList: Car[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  pages: number[] = [];
  sortOption: string = 'priceAsc';

  constructor() {
    this.updateGridCols();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  ngOnInit() {
    this.getCarsList(1);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateGridCols();
  }

  updateGridCols() {
    const width = window.innerWidth;
    if (width < 600) {
      this.gridCols = 1;
    } else if (width < 1050) {
      this.gridCols = 2;
    } else if (width < 1300) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  async getCarsList(pageNum: number) {
    try {
      const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?page=${pageNum}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      this.carsList = data.items.map((item: Car) => ({
        ...item,
        passengers: item.numberOfPassengers || 1,
        transmissionType: item.transmissionType || 'Manual'
      }));
      this.totalPages = data.pageCount || 1;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } catch (error) {
      console.error('Error fetching cars:', error);
      this.carsList = [];
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    this.filterCars();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterCars();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterCars();
    }
  }

  // Filter Logic (Sidebar Only)
  filter: any = {
    brand: [],
    type: [],
    fuelType: [],
    rating: [],
    price: 1000
  };

  updateFilter(key: string, value: string) {
    const index = this.filter[key].indexOf(value);
    if (index === -1) {
      this.filter[key].push(value);
    } else {
      this.filter[key].splice(index, 1);
    }
  }

  updatePriceFilter() {
    this.filterCars();
  }

  async filterCars() {
    const queryParams = new URLSearchParams();
    if (this.filter.brand.length > 0) queryParams.set('brand', this.filter.brand.join(','));
    if (this.filter.type.length > 0) queryParams.set('type', this.filter.type.join(','));
    if (this.filter.fuelType.length > 0) queryParams.set('fuelType', this.filter.fuelType.join(','));
    if (this.filter.rating.length > 0) queryParams.set('rating', this.filter.rating.join(','));
    if (this.filter.price !== 1000) queryParams.set('price', this.filter.price.toString());

    if (this.sortOption) queryParams.set('sort', this.sortOption);

    console.log(`https://nile-cars.azurewebsites.net/api/Cars?page=${this.currentPage}&${queryParams}`);
    try {
      const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?page=${this.currentPage}&${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      this.carsList = data.items.map((item: Car) => ({
        ...item,
        passengers: item.numberOfPassengers || 1,
        transmissionType: item.transmissionType || 'Manual'
      }));
      this.totalPages = data.pageCount || 1;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } catch (error) {
      console.error('Error filtering cars:', error);
      this.carsList = [];
    }
  }

  async sortCars() {
    this.currentPage = 1;
    await this.filterCars();
  }

  clearFilters() {
    this.filter = {
      brand: [],
      type: [],
      fuelType: [],
      rating: [],
      price: 1000
    };
    this.getCarsList(1);
  }

  onRentNow(car: Car) {
    console.log('Rent Now clicked for:', car);
    // Implement rent logic here (e.g., navigate to a booking page)
  }
}