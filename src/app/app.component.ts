import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './service/authservice/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Make sure to mark as standalone if using imports here
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthServiceService
  ) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    this.authService.checkSession();
  }
}


  // Getter to check if user is logged in
  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Logs out user and navigates to login page
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.router.navigateByUrl('/login');
  }
}
