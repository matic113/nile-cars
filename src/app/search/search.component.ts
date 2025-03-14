import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, CommonModule, MatGridListModule, MatCardModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  isLoading = true;
  gridCols: number = 4;
  selectedRating = 0;
  carsList: any[] = [];
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
    const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?page=${pageNum}`);
    const data = await response.json();
    this.carsList = data.items;
    this.totalPages = data.pageCount;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
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

  // Filter and Search Logic
  filter: any = {
    brandSingle: '',
    location: '',
    typeSingle: '',
    fuelTypeSingle: '',
    transmissionSingle: '',
    seatingSingle: '',
    features: [],
    pickupDate: '',
    returnDate: '',
    unlimitedMileage: false,
    mileageLimit: '',
    priceSingle: '',
    brand: [],
    type: [],
    fuelType: [],
    rating: [],
    price: 1000
  };

  setRating(stars: number) {
    this.selectedRating = stars;
    this.filter.rating = [stars.toString()];
  }

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
    // Add single-value filters from the search form
    if (this.filter.brandSingle) queryParams.set('brand', this.filter.brandSingle);
    if (this.filter.location) queryParams.set('location', this.filter.location);
    if (this.filter.typeSingle) queryParams.set('type', this.filter.typeSingle);
    if (this.filter.fuelTypeSingle) queryParams.set('fuelType', this.filter.fuelTypeSingle);
    if (this.filter.transmissionSingle) queryParams.set('transmission', this.filter.transmissionSingle);
    if (this.filter.seatingSingle) queryParams.set('seating', this.filter.seatingSingle);
    if (this.filter.pickupDate) queryParams.set('pickupDate', this.filter.pickupDate);
    if (this.filter.returnDate) queryParams.set('returnDate', this.filter.returnDate);
    if (this.filter.unlimitedMileage) queryParams.set('unlimitedMileage', 'true');
    if (this.filter.mileageLimit && !this.filter.unlimitedMileage) queryParams.set('mileageLimit', this.filter.mileageLimit);
    if (this.filter.priceSingle) queryParams.set('price', this.filter.priceSingle);
    if (this.filter.rating.length > 0) queryParams.set('rating', this.filter.rating[0]);

    // Add multi-value filters from the sidebar and form
    for (const key of ['brand', 'type', 'fuelType', 'rating', 'features']) {
      if (this.filter[key].length > 0) {
        queryParams.set(key, this.filter[key].join(','));
      }
    }
    if (this.filter.price !== 1000) queryParams.set('price', this.filter.price.toString());

    // Add sorting
    if (this.sortOption) queryParams.set('sort', this.sortOption);

    console.log(`https://nile-cars.azurewebsites.net/api/Cars?page=${this.currentPage}&${queryParams}`);
    const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?page=${this.currentPage}&${queryParams}`);
    const data = await response.json();
    this.carsList = data.items;
    this.totalPages = data.pageCount;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async searchCars() {
    this.currentPage = 1;
    await this.filterCars();
  }

  async sortCars() {
    this.currentPage = 1;
    await this.filterCars();
  }

  clearForm() {
    // Reset only the search form fields
    this.filter.brandSingle = '';
    this.filter.location = '';
    this.filter.typeSingle = '';
    this.filter.fuelTypeSingle = '';
    this.filter.transmissionSingle = '';
    this.filter.seatingSingle = '';
    this.filter.features = [];
    this.filter.pickupDate = '';
    this.filter.returnDate = '';
    this.filter.unlimitedMileage = false;
    this.filter.mileageLimit = '';
    this.filter.priceSingle = '';
    this.filter.rating = [];
    this.selectedRating = 0;

    // Optionally, re-fetch the cars with the sidebar filters still applied
    this.filterCars();
  }

  clearFilters() {
    // Reset all filters (including sidebar)
    this.filter = {
      brandSingle: '',
      location: '',
      typeSingle: '',
      fuelTypeSingle: '',
      transmissionSingle: '',
      seatingSingle: '',
      features: [],
      pickupDate: '',
      returnDate: '',
      unlimitedMileage: false, 
      mileageLimit: '',
      priceSingle: '',
      brand: [],
      type: [],
      fuelType: [],
      rating: [],
      price: 1000
    };
    this.selectedRating = 0;
    this.getCarsList(1);
  }
}