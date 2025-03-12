import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}



  token: string | null = null;
  firstname: string | null = null;
  ngOnInit(): void {
    this.firstname = this.authService.getFirstname(); 
    console.log('firstname:', this.firstname);

    const token = this.authService.getToken(); 
    console.log('Token:', token);

   
  }
  
}
