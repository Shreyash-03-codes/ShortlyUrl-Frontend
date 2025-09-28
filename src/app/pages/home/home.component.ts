import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuth();
  }

private checkAuth() {
  if (typeof window !== 'undefined') {  // make sure this is running in browser
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }
  }
}

  navigateTo(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }
}
