import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from '../../service/authservice/auth-service.service';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-sign-in-with-google',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-with-google.component.html',
  styleUrl: './sign-in-with-google.component.css'
})
export class SignInWithGoogleComponent implements OnInit, AfterViewInit {

  constructor(
    private authService: AuthServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router:Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript();
    }
  }

  private loadGoogleScript(): void {
    // Check if Google script is already loaded
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
      return;
    }

  
  }

  private initializeGoogleSignIn(): void {
    try {
      google.accounts.id.initialize({
        client_id: '859169283273-bl45j8u8ptks35272vof4s6t30svai4b.apps.googleusercontent.com',
        callback: (response: any) => this.handleResponse(response),
        error_callback: (error: any) => this.handleError(error)
      });

      const buttonElement = document.getElementById('googleBtn');
      if (buttonElement) {
        google.accounts.id.renderButton(
          buttonElement,
          { 
            theme: 'filled_blue', 
            size: 'large', 
            width: 250,
            type: 'standard'
          }
        );
        
        // Optional: Also display the One Tap prompt
        // google.accounts.id.prompt();
      }
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  private handleResponse(response: any): void {
    if (!response || !response.credential) {
      console.error('Invalid Google response');
      return;
    }

    try {
      const token = response.credential;
      const payload = this.decodeJwt(token);

   const DEFAULT_PASSWORD = "Google@123";

const loginData = {
  email: payload.email,
  password: DEFAULT_PASSWORD
};

const userData = {
  email: payload.email,
  name: payload.name,
  password: DEFAULT_PASSWORD
};

this.authService.login(loginData).subscribe({
  next: (res:any) => {
    // Login success
    localStorage.setItem('token', res.jwtToken);
    localStorage.setItem('user', res.username);
    this.router.navigateByUrl("/home");
  },
  error: (err:any) => {
    // If login fails, signup
    this.authService.signup(userData).subscribe({
      next: (res:any) => {
        localStorage.setItem('token', res.jwtToken);
        localStorage.setItem('user', res.username);
        this.router.navigateByUrl("/home");
      },
      error: (err:any) => console.error('Signup failed:', err)
    });
  }
});

    } catch (error) {
      console.error('Error processing Google response:', error);
    }
  }

  private handleError(error: any): void {
    console.error('Google Sign-In error:', error);
    // Handle different error types
    if (error.type === 'popup_closed') {
      console.log('User closed the popup');
    } else if (error.type === 'access_denied') {
      console.log('User denied permission');
    }
  }

  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return {};
    }
  }
}