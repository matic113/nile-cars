import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


//--------------------------------------------add angular material modules------------------------------------------------------

import { MatSelectModule } from '@angular/material/select';  // إضافة MatSelect
import { MatInputModule } from '@angular/material/input';  // إضافة MatInput
import { MatDatepickerModule } from '@angular/material/datepicker';  // إضافة MatDatepicker
import { MatNativeDateModule } from '@angular/material/core';  // إضافة دعم التواريخ

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoading = false; // Controls loading state
  gridCols: number = 4;

  locations: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];  // ✅ قائمة المواقع
  pickupLocation: string = '';  // ✅ قيمة الموقع المختار
  pickupDate: Date | null = null;  // ✅ تاريخ ووقت الاستلام
  returnDate: Date | null = null;  // ✅ تاريخ ووقت الإرجاع

  constructor() {
    // Update grid columns based on screen size
    this.updateGridCols();
  }

  ngOnInit() {
    this.getCarsList(1);
  }

  searchCars() {
    console.log('Searching for cars...', {
      pickupLocation: this.pickupLocation,
      pickupDate: this.pickupDate,
      returnDate: this.returnDate
    });
  }

//-------------------------------------------------------------------------




  //------------------------------------------------------ Update grid columns based on screen size------------------------------------------------------
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
  //------------------------------------------------------End Update grid columns based on screen size------------------------------------------------------


  //------------------------------------------------------ Get Cars Service start------------------------------------------------------
  // TODO: add another list for enchance pagination first to display and secound to store data
  carsList: any = []

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
  //------------------------------------------------------ Get Cars Service end------------------------------------------------------

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

  //------------------------------------------------------ filter logic ------------------------------------------------------
  filter = {
    maker: '',
    model: '',
    hourPrice: '',
    location: '',
    transmissionType: ''
  };

  async filterCars() {
    const queryParams = new URLSearchParams(this.filter as any).toString();
    console.log(`https://nile-cars.azurewebsites.net/api/Cars?${queryParams}`);

    // const response = await fetch(`https://nile-cars.azurewebsites.net/api/Cars?${queryParams}`);
    // const data = await response.json();
  }
  //------------------------------------------------------ filter logic ------------------------------------------------------
// ------------------------------------------------------car filter component------------------------------------------------------

}












