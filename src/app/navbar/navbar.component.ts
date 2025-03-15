import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,CommonModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  constructor(
    public authService: AuthService, // Changed to public for template access
    private router: Router
  ) {}

  token: string | null = null;
  firstname: string | null = null;

  ngOnInit(): void {
    this.firstname = this.authService.getFirstname(); 
    this.token = this.authService.getToken();
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/home']);
    this.firstname = null;
    this.token = null;
  }
  isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
  
}
