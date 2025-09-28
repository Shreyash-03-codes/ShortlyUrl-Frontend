import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  login = false;
  isBrowser = false; // flag to check if code runs in browser

  features = [
    { icon: '🔗', title: 'Shorten URLs', description: 'Convert long URLs into short, shareable links instantly.' },
    { icon: '📋', title: 'Manage Links', description: 'Organize, edit, and track all your shortened URLs.' },
    { icon: '📊', title: 'Analytics', description: 'View click stats to understand which links perform best.' },
    { icon: '🛡️', title: 'Secure & Reliable', description: 'All links are safe, private, and under your control.' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.checkAuth();
    }
  }

  private checkAuth(): void {
    const token = localStorage.getItem('token');
    this.login = !token; // show login if no token
  }
}
